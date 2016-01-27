'use strict';

angular.module('chesireApp')
    .factory('LastUsedSettingsStore', function($q, localStorageService, SynthoptionsModel) {
        var CURRENT_SYNTH_VERSION = '0.1';

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

            var synthOptions = localStorageService.get('lastUsedSynth');
            if(!synthOptions || (synthOptions.version !== CURRENT_SYNTH_VERSION)) {
                synthOptions = null;
            }
            var lastUsedSynth = SynthoptionsModel.create(synthOptions);
            deferred.resolve(lastUsedSynth);

            return deferred.promise;
        };

        var notifyLastUsedSynthChanged = function(newLastUsedSynth) {
            newLastUsedSynth.version = CURRENT_SYNTH_VERSION;
            localStorageService.set('lastUsedSynth', newLastUsedSynth);
        };

        return {
            getLastUsedSong: getLastUsedSong,
            notifyLastUsedSongChanged: notifyLastUsedSongChanged,
            getLastUsedSynth: getLastUsedSynth,
            notifyLastUsedSynthChanged: notifyLastUsedSynthChanged
        };
    });