(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('synthSelector', synthSelector);

    function synthSelector() {
        var selectedSynth = null;
        var isSynthModified = false;
        var synthPresetSelectedSubscribers = [];
        var synthIsModifiedSubscribers = [];

        var factory = {
            notifySynthPresetSelected: notifySynthPresetSelected,
            subscribeToSynthPresetSelected: subscribeToSynthPresetSelected,
            unsubscribeToSynthPresetSelected: unsubscribeToSynthPresetSelected,
            notifySynthIsModified: notifySynthIsModified,
            subscribeToSynthIsModified: subscribeToSynthIsModified,
            unsubscribeToSynthIsModified: unsubscribeToSynthIsModified
        };

        return factory;

        function notifySynthPresetSelected(synth) {
            selectedSynth = synth;
            for(var i=0; i<synthPresetSelectedSubscribers.length; i++) {
                synthPresetSelectedSubscribers[i](synth);
            }
        }

        function subscribeToSynthPresetSelected(callback) {
            synthPresetSelectedSubscribers.push(callback);
        }

        function unsubscribeToSynthPresetSelected(callback) {
            synthPresetSelectedSubscribers = _.without(synthPresetSelectedSubscribers, callback);
        }

        function notifySynthIsModified(synthIsModified) {
            isSynthModified = synthIsModified;
            for(var i=0; i<synthIsModifiedSubscribers.length; i++) {
                synthIsModifiedSubscribers[i](synthIsModified);
            }
        }

        function subscribeToSynthIsModified(callback) {
            synthIsModifiedSubscribers.push(callback);
        }

        function unsubscribeToSynthIsModified(callback) {
            synthIsModifiedSubscribers = _.without(synthIsModifiedSubscribers, callback);
        }
    }

})();