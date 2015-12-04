(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('songScaleCreator', songScaleCreator);

    function songScaleCreator($q) {
        var _isShown = false;

        var factory = {
            show: show,
            hide: hide,
            isShown: isShown
        };
        return factory;

        function show() {
            var willGetSongFromScale = $q.defer();
            _isShown = true;
            return willGetSongFromScale.promise;
        }

        function isShown() {
            return _isShown;
        }

        function hide() {
            _isShown = false;
        }

    }

})();