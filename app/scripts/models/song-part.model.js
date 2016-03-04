(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SongPartModel', SongPartModel);

    function SongPartModel(DefaultScale) {
        var factory = {
            create: create
        };

        var DEFAULT_PART_OPTIONS = DefaultScale;

        function SongPartClass(options) {
            this.init(options);
            this.$$isSongPart = true;
        }

        SongPartClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_PART_OPTIONS, options);
        };

        SongPartClass.prototype.removeChordAtIndex = function(chordIndex) {
            if(this.chords.length > 2) {
                this.chords.splice(chordIndex, 1);
            } else {
                this.chords[chordIndex].notes = [];
                this.chords[chordIndex].name = undefined;
            }
        };

        SongPartClass.prototype.addChordBefore = function(chordIndex) {
            this.chords.splice(chordIndex, 0, getEmptyChord());
        };

        SongPartClass.prototype.addChordLast = function() {
            this.chords.push(getEmptyChord());
        };

        SongPartClass.prototype.replaceChord = function(chordIndex, newChord) {
            this.chords[chordIndex] = newChord;
        };

        return factory;

        function create(options) {
            return new SongPartClass(options);
        }

        //TODO: do in chord model
        function getEmptyChord() {
            return {
                name: undefined,
                notes: []
            };
        }
    }


})();