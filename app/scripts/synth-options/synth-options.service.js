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
        angular.forEach(synthOptions.controls, function(controlInfo) {
            if(!controlInfo.uniqueId) {
                controlInfo.uniqueId = IdGenerator.getUniqueId();
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

    var notifyComponentChanged = function(componentInfo) {
        for(var i=0; i<synthOptions.components.length; i++) {
            if(synthOptions.components[i].uniqueId === componentInfo.uniqueId) {
                //TODO: check if it really changed
                //Problem, right now the object is changed in the controllers, so we don't know when it really changed
                synthOptions.components[i] = componentInfo;
                break;
            }
        }
        notifyChangeInSynthOptions(synthOptions);
        LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    var notifyControlChanged = function(controlInfo) {
        if(!controlInfo.uniqueId) {
            controlInfo.uniqueId = IdGenerator.getUniqueId();
        }
        for(var i=0; i<synthOptions.controls.length; i++) {
            if(synthOptions.controls[i].uniqueId === controlInfo.uniqueId) {
                //TODO: check if it really changed
                //Problem, right now the object is changed in the controllers, so we don't know when it really changed
                synthOptions.controls[i] = controlInfo;
                break;
            }
        }
        notifyChangeInSynthOptions(synthOptions);
        LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    var notifyControlRemoved = function(controlInfo) {
        synthOptions.controls = _.without(synthOptions.controls, controlInfo);
        notifyChangeInSynthOptions(synthOptions);
        LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    return {
        setSynthOptions: setSynthOptions,
        getSynthOptions: getSynthOptions,
        subscribeToChangesInSynthOptions: subscribeToChangesInSynthOptions,
        notifyComponentChanged: notifyComponentChanged,
        notifyControlChanged: notifyControlChanged,
        notifyControlRemoved: notifyControlRemoved
    };
});
