'use strict';

angular.module('chesireApp')

    .factory('MidiApiMediator', function($q, $document, $compile, $timeout, $rootScope, MidiAccess) {

        var factoryWillBeReady = $q.defer();

        var init = function() {
            initJazzMidi().then(function(jazzObject) {
                factoryWillBeReady.resolve(new MidiAccess(jazzObject));
            });
        };

        var initJazzMidi = function() {
            var jazzWillBeReady = $q.defer();
            var jazzDOMElement = createJazzDOMElement();
            insertJazzDOMElement(jazzDOMElement).then(function() {
                var jazzObject = getJazzObjectFromDOM();
                if(jazzObject.isJazz) {
                    jazzWillBeReady.resolve(jazzObject);
                } else {
                    jazzWillBeReady.reject('Error creating the jazz midi object');
                }
            });
            return jazzWillBeReady.promise;
        };

        var createJazzDOMElement = function() {
            var jazzObjectDomElCreator = angular.element('<div midijazzobject=""></div>');
            var newScope = $rootScope.$new();
            return $compile(jazzObjectDomElCreator)(newScope);
        };

        var insertJazzDOMElement = function(element) {
            //TODO: use $rootElement instead for more cohesion
            var domElementWillBeInserted = $q.defer();
            var body = $document.find('body').eq(0);
            body.append(element);

            $timeout(function() {
                domElementWillBeInserted.resolve(element);
            }, 10);

            return domElementWillBeInserted.promise;
        };

        var getJazzObjectFromDOM = function() {

            return angular.element(document.querySelector('#Jazz2'))[0];
        };

        init();

        return factoryWillBeReady.promise;
    })

    .directive('midijazzobject', function () {
        return {
            template: '<object id="Jazz1" classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90" class="hidden"><object id="Jazz2" type="audio/x-jazz" class="hidden"><p style="visibility:visible;">This page requires <a href="http://jazz-soft.net>Jazz-Plugin</a> ...</p></object></object>',
            restrict: 'A',
            scope: {}
        };
    })

    .factory('MidiAccess', function(MidiOutput) {

        var MidiAccessClass = function(JazzObject) {
            if(!JazzObject) {
                throw 'Error creating MidiAccess object: we need the JazzMidi object';
            }
            this.JazzObject = JazzObject;
        };

        MidiAccessClass.prototype.outputs = function() {

            var jazzObjectMidiOutList = this.JazzObject.MidiOutList();
            var outputs = [];

            for (var i=0; i<jazzObjectMidiOutList.length; i++) {
                outputs.push(new MidiOutput(this, jazzObjectMidiOutList[i], i));
            }

            return outputs;
        };

        return MidiAccessClass;
    })

    .service('MidiOutput', function(MidiMessagesHelper) {

        var jazzObject = null;

        var MidiOutput = function ( midiAccess, name, index ) {
            jazzObject = midiAccess.JazzObject;
            this.id = '' + index + '.' + name;
            this.name = name;
            jazzObject.outputInUse = true;
            jazzObject.MidiOutOpen(this.name);
        };

        var send = function( data ) {
            jazzObject.MidiOutLong( data );
        };

        MidiOutput.prototype.notesOff = function (notesOff) {
            angular.forEach(notesOff, function(note) {
                if(note) {
                    send(MidiMessagesHelper.getNoteOff(note));
                }
            });
        };

        MidiOutput.prototype.notesOn = function (notesOn) {
            angular.forEach(notesOn, function(note) {
                send(MidiMessagesHelper.getNoteOn(note));
            });
        };

        MidiOutput.prototype.keyPressureChanges = function (notesUpdate) {
            angular.forEach(notesUpdate, function(note) {
                send(MidiMessagesHelper.getKeyPressureChange(note));
            });
        };

        MidiOutput.prototype.allOff = function(notes) {

            angular.forEach(notes, function(note) {
                if(note) {
                    send(MidiMessagesHelper.getNoteOff(note));
                }
            });
            //send(MidiMessagesHelper.getAllNotesOff());
        };

        return MidiOutput;
    })
    ;