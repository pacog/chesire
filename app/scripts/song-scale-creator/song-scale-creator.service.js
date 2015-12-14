(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('songScaleCreator', songScaleCreator);

    function songScaleCreator($q) {
        var _isShown = false;
        var willGetSongFromScale;

        var factory = {
            show: show,
            hide: hide,
            isShown: isShown,
            notifySongHasBeenCreated: notifySongHasBeenCreated
        };
        return factory;

        function show() {
            willGetSongFromScale = $q.defer();
            _isShown = true;
            return willGetSongFromScale.promise;
        }

        function isShown() {
            return _isShown;
        }

        function hide() {
            _isShown = false;
        }

        function notifySongHasBeenCreated() {
            if(willGetSongFromScale) {
                willGetSongFromScale.resolve();
            }
        }

    }

})();