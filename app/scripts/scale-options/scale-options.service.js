(function() {
    'use strict';
    angular.module('chesireApp')
        .factory('ScaleOptions', ScaleOptions);

    function ScaleOptions($q, LastUsedSettingsStore, DefaultScale) {

        var scaleOptions = null;
        var subscriberCallbacks = [];

        var factory = {
            init: init,
            setScaleOptions: setScaleOptions,
            getScaleOptions: getScaleOptions,
            subscribeToChangesInScaleOptions: subscribeToChangesInScaleOptions
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

        function getScaleOptions() {
            var willReturnScaleOptions = $q.defer();

            if(scaleOptions) {
                willReturnScaleOptions.resolve(scaleOptions);
            } else {
                LastUsedSettingsStore.getLastUsedSong().then(function(lastUsedSong) {
                    if(!lastUsedSong) {
                        lastUsedSong = DefaultScale;
                    }
                    scaleOptions = lastUsedSong;
                    willReturnScaleOptions.resolve(lastUsedSong);
                });
            }

            return willReturnScaleOptions.promise;
        }

        function subscribeToChangesInScaleOptions(subscriberCallback) {
            subscriberCallbacks.push(subscriberCallback);
        }

        function notifyChangeInScaleOptions(newScaleOptions) {
            angular.forEach(subscriberCallbacks, function(subscriberCallback) {
                subscriberCallback(newScaleOptions);
            });
        }

    }
})();


