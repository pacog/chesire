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
            this.currentPart = this.currentPart || 0;
        };

        SongClass.prototype.getCurrentPart = function() {
            return this.parts[this.currentPart];
        };

        SongClass.prototype.setCurrentPart = function(part) {
            this.currentPart = part.index;
        };

        SongClass.prototype.replaceCurrentPart = function(part) {
            part.index = this.currentPart;
            this.parts[this.currentPart] = part;
        };

        SongClass.prototype.addPart = function() {
            var newPart = SongPartModel.create();
            newPart.index = this.parts.length;
            this.parts.push(newPart);
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
            return true;
        };

        SongClass.prototype.deletePart = function(partToRemove) {
            if (this.parts.length > 1) {
                this.parts.splice(partToRemove.index, 1);
                this._updatePartsIndex();
                if(this.currentPart >= this.parts.length) {
                    this.currentPart = this.parts.length - 1;
                }
                return true;
            }
            return false;
        };

        SongClass.prototype.duplicatePart = function(partToDuplicate) {
            var newPart = SongPartModel.create(angular.copy(partToDuplicate));
            newPart.name += ' (copy)';
            this.parts.push(newPart);
            this._updatePartsIndex();
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
            this._oldChords = this.chords;
            this.chords = undefined;
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