(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('windowResize', windowResize);

    function windowResize($window, ObserverFactory) {
        var THROTTLE_TIME = 1000; //ms
        var changeObserver = ObserverFactory.create();

        var factory = {
            observer: changeObserver
        };

        init();

        return factory;

        function init() {
            var throttledCallback = _.debounce(function() {
                changeObserver.notify();
            }, THROTTLE_TIME);
            angular.element($window).on('resize', throttledCallback);
        }
    }
})();