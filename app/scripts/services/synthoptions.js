'use strict';

angular.module('chesireApp')

.factory('SynthOptions', function () {

    var synthOptions = null;
    var subscriberCallbacks = [];

    var setSynthOptions = function(newSynthOptions) {
        console.log(newSynthOptions);
        synthOptions = newSynthOptions;
        notifyChangeInSynthOptions(newSynthOptions);

    };

    var getSynthOptions = function() {
        return synthOptions;
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
