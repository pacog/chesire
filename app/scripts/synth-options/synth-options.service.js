(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthOptions', SynthOptions);

    function SynthOptions($q, LastUsedSettingsStore, IdGenerator, SynthoptionsModel) {

        var synthOptions = null;
        var subscriberCallbacks = [];

        var factory = {
            init: init,
            setSynthOptions: setSynthOptions,
            getSynthOptions: getSynthOptions,
            subscribeToChangesInSynthOptions: subscribeToChangesInSynthOptions,
            unsubscribeToChangesInSynthOptions: unsubscribeToChangesInSynthOptions,
            notifyComponentChanged: notifyComponentChanged,
            notifyControlChanged: notifyControlChanged,
            notifyControlRemoved: notifyControlRemoved,
            notifyOscillatorChanged: notifyOscillatorChanged,
            removeOscillator: removeOscillator,
            removeNoise: removeNoise,
            removeComponent: removeComponent
        };

        return factory;

        function init() {
            getSynthOptions().then(setSynthOptions);
        }

        function setSynthOptions(newSynthOptions, afterSynthDeleted) {
            if(!newSynthOptions.$$isSynth) {
                newSynthOptions = SynthoptionsModel.create(newSynthOptions);
            }
            synthOptions = newSynthOptions;
            addIdsToComponents();
            notifyChangeInSynthOptions(synthOptions, afterSynthDeleted);
            LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
        }

        function getSynthOptions() {
            var willReturnSynthOptions = $q.defer();

            if(synthOptions) {
                willReturnSynthOptions.resolve(synthOptions);
            } else {
                LastUsedSettingsStore.getLastUsedSynth().then(function(lastUsedSynth) {
                    synthOptions = lastUsedSynth;
                    addIdsToComponents();
                    willReturnSynthOptions.resolve(synthOptions);
                });
            }

            return willReturnSynthOptions.promise;
        }

        function addIdsToComponents() {
            angular.forEach(synthOptions.midi.components, addIdToElement);
            angular.forEach(synthOptions.midi.controls, addIdToElement);
            angular.forEach(synthOptions.audio.components, addIdToElement);
            angular.forEach(synthOptions.audio.oscillators, addIdToElement);
            angular.forEach(synthOptions.audio.noises, addIdToElement);
            angular.forEach(synthOptions.audio.controls, addIdToElement);
        }

        function addIdToElement(element) {
            if(element && !element.uniqueId) {
                element.uniqueId = IdGenerator.getUniqueId();
            }
        }

        function subscribeToChangesInSynthOptions(subscriberCallback) {
            subscriberCallbacks.push(subscriberCallback);
            subscriberCallback(synthOptions);
        }

        function unsubscribeToChangesInSynthOptions(subscriberCallback) {
            subscriberCallbacks = _.without(subscriberCallbacks, subscriberCallback);
        }

        function notifyChangeInSynthOptions(newSynthOptions, afterSynthDeleted) {
            angular.forEach(subscriberCallbacks, function(subscriberCallback) {
                subscriberCallback(newSynthOptions, afterSynthDeleted);
            });
        }

        function notifyComponentChanged(componentInfo) {
            for(var i=0; i<synthOptions.getActiveComponents().length; i++) {
                if(synthOptions.getActiveComponents()[i].uniqueId === componentInfo.uniqueId) {
                    //TODO: check if it really changed
                    //Problem, right now the object is changed in the controllers, so we don't know when it really changed
                    synthOptions.getActiveComponents()[i] = componentInfo;
                    break;
                }
            }
            notifyChangeInSynthOptions(synthOptions);
            LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
        }

        function notifyOscillatorChanged() {
            notifyChangeInSynthOptions(synthOptions);
            LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
        }

        function notifyControlChanged(controlInfo) {
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
            LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
        }

        function removeOscillator(oscillatorInfo) {
            if(synthOptions && synthOptions.audio) {
                synthOptions.audio.removeOscillator(oscillatorInfo);
            }
        }

        function removeNoise(noiseInfo) {
            if(synthOptions && synthOptions.audio) {
                synthOptions.audio.removeNoise(noiseInfo);
            }
        }

        function removeComponent(componentInfo) {
            if(synthOptions && synthOptions.audio) {
                synthOptions.audio.removeComponent(componentInfo);
            }
        }

        function notifyControlRemoved(controlInfo) {
            synthOptions.removeControl(controlInfo);
            notifyChangeInSynthOptions(synthOptions);
            LastUsedSettingsStore.notifyLastUsedSynthChanged(synthOptions);
        }
    }
})();

