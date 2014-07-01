'use strict';

angular.module('chesireApp')

.factory('SynthOptions', function ($q, LastUsedSettingsStore, DefaultSynth, IdGenerator) {

    var synthOptions = null;
    var subscriberCallbacks = [];

    var setSynthOptions = function(newSynthOptions) {
        synthOptions = newSynthOptions;
        addIdsToComponents();
        notifyChangeInSynthOptions(synthOptions);
        LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
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
                addIdsToComponents();
                willReturnSynthOptions.resolve(synthOptions);
            });
        }

        return willReturnSynthOptions.promise;
    };

    var addIdsToComponents = function() {
        angular.forEach(synthOptions.components, function(componentInfo) {
            if(!componentInfo.uniqueId) {
                componentInfo.uniqueId = IdGenerator.getUniqueId();
            }
        });
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
