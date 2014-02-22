'use strict';

angular.module('chesireApp')
    .factory('ChordStore', function($q, localStorageService) {
        
        var getChords = function() {

            var deferred = $q.defer();
            deferred.resolve(localStorageService.get('chords') || []);

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
                    allChords = [];
                }

                var existingChord = false;
                for(var i=0; i<allChords.length; i++) {
                    if(allChords[i].name === chord.name) {
                        allChords[i] = chord;
                        existingChord = true;
                        break;
                    }
                }
                if(!existingChord) {

                    allChords.push(chord);
                }
                localStorageService.set('chords', allChords);
                deferred.resolve(chord);
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