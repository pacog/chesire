(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('soundMuter', soundMuter);

    function soundMuter(hotKeys) {
        var isMutedFlag = false;
        var factory = {
            init: init,
            isMuted: isMuted
        };

        return factory;

        function init() {
            isMutedFlag = false;
            hotKeys.on('TOGGLE_MUTE', toggleMute);
        }

        function isMuted() {
            return isMutedFlag;
        }

        function toggleMute() {
            isMutedFlag = !isMutedFlag;
        }
    }

})();