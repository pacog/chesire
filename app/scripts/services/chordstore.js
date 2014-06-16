'use strict';

angular.module('chesireApp')
    .factory('ChordStore', function($q, localStorageService) {

        var changeInAllChordsSubscribers = [];

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

                var existingChord = findChordInList(chord, allChords);
                if(existingChord) {
                    existingChord.notes = chord.notes;
                } else {
                    allChords.push(chord);
                }
                localStorageService.set('chords', allChords);
                deferred.promise.then(onChangeInAllChords);
                deferred.resolve(allChords);
            }
            
            return deferred.promise;
        };

        var deleteChord = function(chordToDelete) {
            var deferred = $q.defer();
            var allChords = localStorageService.get('chords');
            var existingChord = findChordInList(chordToDelete, allChords);

            allChords = _.without(allChords, existingChord);
            localStorageService.set('chords', allChords);
            deferred.promise.then(onChangeInAllChords);
            deferred.resolve(allChords);

            return deferred.promise;
        };

        var findChordInList = function(chord, chordList) {
            for(var i=0; i<chordList.length; i++) {
                if(chordList[i].name === chord.name) {
                    return chordList[i];
                }
            }
            return false;
        };

        var subscribeToChangeInAllChords = function(callback) {
            changeInAllChordsSubscribers.push(callback);
        };

        var unsubscribeToChangeInAllChords = function(callback) {
            changeInAllChordsSubscribers = _.without(changeInAllChordsSubscribers, callback);
        };

        var onChangeInAllChords = function(newAllChords) {
            angular.forEach(changeInAllChordsSubscribers, function(callback) {
                callback(newAllChords);
            });
        };

        return {
            getChords:      getChords,
            saveChord:      saveChord,
            deleteChord:    deleteChord,
            subscribeToChangeInAllChords: subscribeToChangeInAllChords,
            unsubscribeToChangeInAllChords: unsubscribeToChangeInAllChords
        };
    });