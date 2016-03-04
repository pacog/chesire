(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SongModel', SongModel);

    function SongModel(DefaultScale, SongPartModel) {
        var factory = {
            create: create
        };
        
        var DEFAULT_SONG_OPTIONS = DefaultScale;

        function SongClass(options) {
            this.init(options);
            this.$$isSong = true;
        }

        SongClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_SONG_OPTIONS, options);
            this._createPartsIfNeeded();
            this._decorateParts();
            this.currentPart = this.currentPart || 0;
        };

        SongClass.prototype.getCurrentPart = function() {
            return this.parts[this.currentPart];
        };

        SongClass.prototype.setCurrentPart = function(part) {
            if(this.currentPart !== part.index) {
                this.currentPart = part.index;
                this.$isModified = true;
                return true;
            }
            return false;
        };

        SongClass.prototype.replaceCurrentPart = function(part) {
            part.index = this.currentPart;
            this.parts[this.currentPart] = part;
            this.$isModified = true;
        };

        SongClass.prototype.addPart = function() {
            var newPart = SongPartModel.create();
            newPart.index = this.parts.length;
            this.parts.push(newPart);
            this.$isModified = true;
            return newPart;
        };


        SongClass.prototype.setCurrentPartByIndex = function(index) {
            if(index < 0) {
                index = 0;
            }
            if(index >= this.parts.length) {
                index = this.parts.length - 1;
            }
            this.currentPart = index;
            this.$isModified = true;
        };

        SongClass.prototype.movePart = function(originIndex, destinationIndex) {
            if((originIndex === destinationIndex) || (originIndex === (destinationIndex - 1) )) {
                return false;
            }

            var insertAtEnd = (destinationIndex >= this.parts.length);
            var partToMove = this.parts[originIndex];

            this.parts.splice(originIndex, 1);

            if(insertAtEnd) {
                this.parts.push(partToMove);
            } else {
                this.parts.splice(destinationIndex, 0, partToMove);
            }

            this._updatePartsIndex();
            this.$isModified = true;
            return true;
        };

        SongClass.prototype.deletePart = function(partToRemove) {
            if (this.parts.length > 1) {
                this.parts.splice(partToRemove.index, 1);
                this._updatePartsIndex();
                if(this.currentPart >= this.parts.length) {
                    this.currentPart = this.parts.length - 1;
                }
                this.$isModified = true;
                return true;
            }
            return false;
        };

        SongClass.prototype.duplicatePart = function(partToDuplicate) {
            var newPart = SongPartModel.create(angular.copy(partToDuplicate));
            newPart.name += ' (copy)';
            this.parts.push(newPart);
            this._updatePartsIndex();
            this.$isModified = true;
            return true;
        };

        SongClass.prototype.removeChordInPart = function(part, chordIndex) {
            part.removeChordAtIndex(chordIndex);
            this.$isModified = true;
            return true;
        };
        

        SongClass.prototype.addChordBefore = function(part, chordIndex) {
            part.addChordBefore(chordIndex);
            this.$isModified = true;
            return true;
        };

        SongClass.prototype.addChordLast = function(part) {
            part.addChordLast();
            this.$isModified = true;
            return true;
        };

        SongClass.prototype.replaceChord = function(part, chordIndex, newChord) {
            part.replaceChord(chordIndex, newChord);
            this.$isModified = true;
            return true;
        };

        SongClass.prototype._updatePartsIndex = function () {
            for(var i=0; i<this.parts.length; i++) {
                this.parts[i].index = i;
            }
        };

        SongClass.prototype._createPartsIfNeeded = function() {
            if(!this.parts || !this.parts.length) {
                this.parts = [];
                this.parts.push(createPartFromSong(this));
            }
            this._oldChords = undefined;
            this.chords = undefined;
        };

        SongClass.prototype._decorateParts = function() {
            for(var i=0; i<this.parts.length; i++) {
                this.parts[i] = SongPartModel.create(this.parts[i]);
            }
        };

        return factory;

        function create(options) {
            return new SongClass(options);
        }

        function createPartFromSong(song) {
            var partOptions = null;
            if(song.chords && song.chords.length) {
                partOptions = {
                    'name': 'Original part',
                    'chords': song.chords,
                    'index': 0
                };
            }
            return SongPartModel.create(partOptions);
        }
    }


})();