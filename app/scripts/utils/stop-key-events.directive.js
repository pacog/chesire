(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('stopKeyEvents', stopKeyEvents);

    function stopKeyEvents() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element) {
            console.log('link');
            init();

            function init() {
                element.on('keyup', onKeyEvent);
                element.on('keydown', onKeyEvent);
                element.on('keypress', onKeyEvent);
                scope.$on('$destroy', onDestroy);
            }

            function onKeyEvent(event) {
                event.stopPropagation();
            }

            function onDestroy() {
                element.off('keyup', onKeyEvent);
                element.off('keydown', onKeyEvent);
                element.off('keypress', onKeyEvent);
            }
            
        }
    }

})();