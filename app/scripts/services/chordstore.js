'use strict';

angular.module('chesireApp')
    .factory('ChordStore', function($q, localStorageService) {
        
        var getChords = function() {

            var deferred = $q.defer();
            deferred.resolve(localStorageService.get('chords') || {});

            return deferred.promise;
        };

        var saveChord = function(chord) {

            var deferred = $q.defer();
            if(!chord || !chord.name || !chord.notes || !chord.notes.length) {

                deferred.reject('Error saving chord, bad config');
            } else {

                var allChords = localStorageService.get('chords');
                if(allChords) {
                    allChords = angular.fromJson(allChords);
                } else {
                    localStorageService.set('chords', {});
                    allChords = {};
                }

                var existingChord = allChords[chord.name];
                if(!existingChord) {

                    allChords[chord.name] = chord;
                    deferred.resolve(chord);
                } else {

                    deferred.reject('Error saving chord, name already exists');
                }
            }
            
            return deferred.promise;
        };

        var deleteChord = function() {};

        return {
            getChords:      getChords,
            saveChord:      saveChord,
            deleteChord:    deleteChord
        };
    });