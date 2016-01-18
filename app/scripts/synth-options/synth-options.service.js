'use strict';

angular.module('chesireApp')

.factory('SynthOptions', function ($q, LastUsedSettingsStore, IdGenerator, SynthoptionsModel) {

    var synthOptions = null;
    var subscriberCallbacks = [];

    var setSynthOptions = function(newSynthOptions) {
        synthOptions = newSynthOptions;
        addIdsToComponents();
        notifyChangeInSynthOptions(synthOptions);
//         LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    var getSynthOptions = function() {
        var willReturnSynthOptions = $q.defer();

        if(synthOptions) {
            willReturnSynthOptions.resolve(synthOptions);
        } else {
            synthOptions = SynthoptionsModel.create();
            willReturnSynthOptions.resolve(synthOptions);
            // // LastUsedSettingsStore.getLastUsedSynth().then(function(lastUsedSynth) {
            //     if(!lastUsedSynth) {
            //         lastUsedSynth = DefaultSynth;
            //     }
            //     synthOptions = lastUsedSynth;
            //     addIdsToComponents();
            //     willReturnSynthOptions.resolve(synthOptions);
            // });
        }

        return willReturnSynthOptions.promise;
    };

    var addIdsToComponents = function() {
        angular.forEach(synthOptions.midi.components, addIdToElement);
        angular.forEach(synthOptions.midi.controls, addIdToElement);
        angular.forEach(synthOptions.audio.components, addIdToElement);
        angular.forEach(synthOptions.audio.controls, addIdToElement);
    };

    function addIdToElement(element) {
        if(element && !element.uniqueId) {
            element.uniqueId = IdGenerator.getUniqueId();
        }
    }

    var subscribeToChangesInSynthOptions = function(subscriberCallback) {
        subscriberCallbacks.push(subscriberCallback);
        subscriberCallback(synthOptions);
    };

    var notifyChangeInSynthOptions = function(newSynthOptions) {
        debugger;
        angular.forEach(subscriberCallbacks, function(subscriberCallback) {
            subscriberCallback(newSynthOptions);
        });
    };

    var notifyComponentChanged = function(componentInfo) {
        for(var i=0; i<synthOptions.getActiveComponents().length; i++) {
            if(synthOptions.getActiveComponents()[i].uniqueId === componentInfo.uniqueId) {
                //TODO: check if it really changed
                //Problem, right now the object is changed in the controllers, so we don't know when it really changed
                synthOptions.getActiveComponents()[i] = componentInfo;
                break;
            }
        }
        notifyChangeInSynthOptions(synthOptions);
        // LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    var notifyControlChanged = function(controlInfo) {
        if(!controlInfo.uniqueId) {
            controlInfo.uniqueId = IdGenerator.getUniqueId();
        }
        for(var i=0; i<synthOptions.getActiveControls().length; i++) {
            if(synthOptions.getActiveControls()[i].uniqueId === controlInfo.uniqueId) {
                //TODO: check if it really changed
                //Problem, right now the object is changed in the controllers, so we don't know when it really changed
                synthOptions.getActiveControls()[i] = controlInfo;
                break;
            }
        }
        notifyChangeInSynthOptions(synthOptions);
        // LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
    };

    var notifyControlRemoved = function(controlInfo) {
        synthOptions.removeControl(controlInfo);
        notifyChangeInSynthOptions(synthOptions);
        // LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
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
