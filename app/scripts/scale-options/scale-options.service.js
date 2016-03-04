(function() {
    'use strict';
    angular.module('chesireApp')
        .factory('ScaleOptions', ScaleOptions);

    function ScaleOptions($q, LastUsedSettingsStore, SongModel) {

        var scaleOptions = null;
        var subscriberCallbacks = [];
        var willReturnScaleOptions = null;

        var factory = {
            init: init,
            setScaleOptions: setScaleOptions,
            setScaleOptionsFromPreset: setScaleOptionsFromPreset,
            getScaleOptions: getScaleOptions,
            subscribeToChangesInScaleOptions: subscribeToChangesInScaleOptions,
            unsubscribeToChangesInScaleOptions: unsubscribeToChangesInScaleOptions
        };
        return factory;

        function init() {
            getScaleOptions().then(setScaleOptions);
        }

        function setScaleOptions(newScaleOptions) {
            scaleOptions = newScaleOptions;
            notifyChangeInScaleOptions(newScaleOptions);
            LastUsedSettingsStore.notifyLastUsedSongChanged(newScaleOptions);
        }

        function setScaleOptionsFromPreset(preset) {
            setScaleOptions(SongModel.create(preset));
        }

        function getScaleOptions() {
            if(willReturnScaleOptions) {
                //Already retrieving it
                return willReturnScaleOptions.promise;
            } else {
                return startRetrievingScaleOptions();
            }
        }

        function startRetrievingScaleOptions() {
            if(scaleOptions) {
                return getCurrentlySavedScaleOptions();
            } else {
                return getLastUsedSettings();
            }
        }

        function getCurrentlySavedScaleOptions() {
            var willGetOptions = $q.defer();
            willGetOptions.resolve(scaleOptions);
            return willGetOptions.promise;
        }

        function getLastUsedSettings() {
            willReturnScaleOptions = $q.defer();
            LastUsedSettingsStore.getLastUsedSong().then(function(lastUsedSong) {
                scaleOptions = SongModel.create(lastUsedSong);
                willReturnScaleOptions.resolve(scaleOptions);
                willReturnScaleOptions = null;
            });
            return willReturnScaleOptions.promise;
        }

        function subscribeToChangesInScaleOptions(subscriberCallback) {
            subscriberCallbacks.push(subscriberCallback);
            subscriberCallback(scaleOptions);
        }

        function unsubscribeToChangesInScaleOptions(subscriberCallback) {
            subscriberCallbacks = _.without(subscriberCallbacks, subscriberCallback);
        }

        function notifyChangeInScaleOptions(newScaleOptions) {
            angular.forEach(subscriberCallbacks, function(subscriberCallback) {
                subscriberCallback(newScaleOptions);
            });
        }

    }
})();


