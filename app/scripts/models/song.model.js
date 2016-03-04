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

        SongClass.prototype.replaceCurrentPart = function(part) {
            part.index = this.currentPart;
            this.parts[this.currentPart] = part;
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