'use strict';

angular.module('chesireApp')

.factory('SynthOptions', function ($q, LastUsedSettingsStore, DefaultSynth) {

    var synthOptions = null;
    var subscriberCallbacks = [];

    var setSynthOptions = function(newSynthOptions) {
        synthOptions = newSynthOptions;
        notifyChangeInSynthOptions(newSynthOptions);
        LastUsedSettingsStore.notifyLastUsedSynthChanged(newSynthOptions);
    };

    var getSynthOptions = function() {
        var willReturnSynthOptions = $q.defer();

        if(synthOptions) {
            willReturnSynthOptions.resolve(synthOptions);
        } else {
            LastUsedSettingsStore.getLastUsedSynth().then(function(lastUsedSynth) {
                if(!lastUsedSynth) {
                    lastUsedSynth = DefaultSynth;
                }
                synthOptions = lastUsedSynth;
                willReturnSynthOptions.resolve(lastUsedSynth);
            });
        }

        return willReturnSynthOptions.promise;
    };

    var subscribeToChangesInSynthOptions = function(subscriberCallback) {
        subscriberCallbacks.push(subscriberCallback);
    };

    var notifyChangeInSynthOptions = function(newSynthOptions) {
        angular.forEach(subscriberCallbacks, function(subscriberCallback) {
            subscriberCallback(newSynthOptions);
        });
    };

    return {
        setSynthOptions: setSynthOptions,
        getSynthOptions: getSynthOptions,
        subscribeToChangesInSynthOptions: subscribeToChangesInSynthOptions
    };
});
