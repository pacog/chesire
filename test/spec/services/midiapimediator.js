'use strict';

describe('Service: MidiApiMediator', function() {

    // load the service's module
    beforeEach(module('chesireApp'));

    // instantiate service
    var MidiApiMediator, timeout, q;
    beforeEach(inject(function(_MidiApiMediator_, $timeout) {
        MidiApiMediator = _MidiApiMediator_;
        timeout = $timeout;
    }));

    it('should return a promise', function() {
        expect( !! MidiApiMediator.then).toBe(true);
        expect( !! MidiApiMediator['finally']).toBe(true);
    });

    it('should fullfill the promise it returns', function() {
        var ready = false;
        var result;

        runs(function() {
            MidiApiMediator.then(function onResponse( data )
                {
                    result = data;
                    ready  = true;
                },
                function onError( fault )
                {
                    ready  = true;
                }
            );
            timeout.flush();
        });

        waitsFor( function() {
            return ready;
        });

        runs( function() {
            expect(!!result).toBe(true);
        });
    });

    // it('midiAccess should have a list of inputs', function() {

    //     var midiAccess = false;

    //     runs(function() {
    //         MidiApiMediator.then(function ( newMidiAccess ){
    //             midiAccess = newMidiAccess;
    //         });
    //         timeout.flush();
    //     });

    //     waitsFor( function() {
    //         return !!midiAccess;
    //     });

    //     runs( function() {
    //         var midiInputs = midiAccess.inputs();
    //         expect(angular.isArray(midiInputs));
    //     });
    // });

    it('midiAccess should have a list of outputs', function() {

        var midiAccess = false;

        runs(function() {
            MidiApiMediator.then(function ( newMidiAccess ){
                midiAccess = newMidiAccess;
            });
            timeout.flush();
        });

        waitsFor( function() {
            return !!midiAccess;
        });

        runs( function() {
            var midiOutputs = midiAccess.outputs();
            expect(angular.isArray(midiOutputs));
            expect(midiOutputs.length).not.toBe(0);
        });
    });
});