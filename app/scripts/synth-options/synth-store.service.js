(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthStore', SynthStore);

    function SynthStore($q, localStorageService) {

        var allSynthsCache = null;
        var changeInAllSynthsSubscribers = [];

        var factory = {
            getSynths: getSynths,
            saveSynth: saveSynth,
            deleteSynth: deleteSynth,
            subscribeToChangeInAllSynths: subscribeToChangeInAllSynths,
            unsubscribeToChangeInAllSynths: unsubscribeToChangeInAllSynths
        };

        return factory;

        function getSynths() {
            var deferred = $q.defer();

            allSynthsCache = localStorageService.get('synths') || [];

            deferred.resolve(allSynthsCache);
            onChangeInAllSynths(allSynthsCache);

            return deferred.promise;
        }

        function saveSynth(synth) {
            var deferred = $q.defer();
            if(!synth || !synth.name) {
                deferred.reject('Error saving synth, bad config');
            } else {
                var allSynths = localStorageService.get('synths');
                if(allSynths) {
                    allSynths = angular.fromJson(allSynths);
                } else {
                    allSynths = [];
                }

                var existingSynthIndex = findSynthIndexInList(synth, allSynths);
                if(existingSynthIndex > -1) {
                    allSynths[existingSynthIndex] = synth;
                } else {
                    allSynths.push(synth);
                }

                localStorageService.set('synths', allSynths);
                allSynthsCache = allSynths;
                deferred.promise.then(onChangeInAllSynths);
                deferred.resolve(allSynths);
            }
            
            return deferred.promise;
        }

        //TODO: many things shared in different stores, should create a helper service with common code
        function deleteSynth(synthToDelete) {
            var deferred = $q.defer();
            var allSynths = localStorageService.get('synths');
            var existingSynth = findSynthInList(synthToDelete, allSynths);

            if(allSynths.length > 1) {
                allSynths = _.without(allSynths, existingSynth);
                allSynthsCache = allSynths;
                localStorageService.set('synths', allSynths);
                deferred.promise.then(function(newAllSynths) {
                    onChangeInAllSynths(newAllSynths, true);
                });
                deferred.resolve(allSynths);
            } else {
                deferred.reject('Cannot delete the last synth');
            }

            return deferred.promise;
        }

        function findSynthInList(synth, synthList) {
            var index = findSynthIndexInList(synth, synthList);
            if(index >-1) {
                return synthList[index];
            } else {
                return false;
            }
        }
        function findSynthIndexInList(synth, synthList) {
            for(var i=0; i<synthList.length; i++) {
                if(synthList[i].name === synth.name) {
                    return i;
                }
            }
            return -1;
        }

        function subscribeToChangeInAllSynths(callback) {
            changeInAllSynthsSubscribers.push(callback);
            callback(allSynthsCache);
        }

        function unsubscribeToChangeInAllSynths(callback) {
            changeInAllSynthsSubscribers = _.without(changeInAllSynthsSubscribers, callback);
        }

        function onChangeInAllSynths(newAllSynths, deletedSynth) {
            angular.forEach(changeInAllSynthsSubscribers, function(callback) {
                callback(newAllSynths, deletedSynth);
            });
        }

    }


})();

