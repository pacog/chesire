'use strict';

angular.module('chesireApp')

.factory('ScaleOptions', function () {

    var scaleOptions = null;
    var subscriberCallbacks = [];

    var setScaleOptions = function(newScaleOptions) {
        scaleOptions = newScaleOptions;
        notifyChangeInScaleOptions(newScaleOptions);
    };

    var getScaleOptions = function() {
        return scaleOptions;
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

