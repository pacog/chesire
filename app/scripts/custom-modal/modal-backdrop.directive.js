(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('modalBackdrop', modalBackdrop);

    function modalBackdrop($timeout, modalFactory) {
        return {
            restrict: 'E',
            replace: true,
            template: '<a class="modal-backdrop {{backdropClass}}"></a>',
            link: link
        };

        function link(scope, element, attrs) {
            scope.backdropClass = attrs.backdropClass || '';
            if(!attrs.avoidBackdropClosing) {
                $timeout(function () {
                    element.on('click', modalFactory.close);
                }, 0, false);
            }
        }
    }

})();