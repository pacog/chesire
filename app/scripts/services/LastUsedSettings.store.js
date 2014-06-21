'use strict';

angular.module('chesireApp')
    .factory('LastUsedSettingsStore', function($q, localStorageService) {

        var getLastUsedSong = function() {
            var deferred = $q.defer();

            deferred.resolve(localStorageService.get('lastUsedSong'));

            return deferred.promise;
        };

        var notifyLastUsedSongChanged = function(newLastUsedSong) {
            localStorageService.set('lastUsedSong', newLastUsedSong);
        };

        var getLastUsedSynth = function() {
            var deferred = $q.defer();

            deferred.resolve(localStorageService.get('lastUsedSynth'));

            return deferred.promise;
        };

        var notifyLastUsedSynthChanged = function(newLastUsedSynth) {
            localStorageService.set('lastUsedSynth', newLastUsedSynth);
        };

        return {
            getLastUsedSong: getLastUsedSong,
            notifyLastUsedSongChanged: notifyLastUsedSongChanged,
            getLastUsedSynth: getLastUsedSynth,
            notifyLastUsedSynthChanged: notifyLastUsedSynthChanged
        };
    });