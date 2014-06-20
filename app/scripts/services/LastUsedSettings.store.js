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

        return {
            getLastUsedSong: getLastUsedSong,
            notifyLastUsedSongChanged: notifyLastUsedSongChanged
        };
    });