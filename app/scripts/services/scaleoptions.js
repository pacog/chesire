'use strict';

angular.module('chesireApp')

.factory('ScaleOptions', function ($q, LastUsedSettingsStore, DefaultScale) {

    var scaleOptions = null;
    var subscriberCallbacks = [];

    var setScaleOptions = function(newScaleOptions) {
        scaleOptions = newScaleOptions;
        notifyChangeInScaleOptions(newScaleOptions);
        LastUsedSettingsStore.notifyLastUsedSongChanged(newScaleOptions);
    };

    var getScaleOptions = function() {
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
    };

    var subscribeToChangesInScaleOptions = function(subscriberCallback) {
        subscriberCallbacks.push(subscriberCallback);
    };

    var notifyChangeInScaleOptions = function(newScaleOptions) {
        angular.forEach(subscriberCallbacks, function(subscriberCallback) {
            subscriberCallback(newScaleOptions);
        });
    };

    return {
        setScaleOptions: setScaleOptions,
        getScaleOptions: getScaleOptions,
        subscribeToChangesInScaleOptions: subscribeToChangesInScaleOptions
    };
});

