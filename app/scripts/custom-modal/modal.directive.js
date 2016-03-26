(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('modal', modal);

    function modal($timeout) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            transclude: true,
            templateUrl: 'scripts/custom-modal/modal.tpl.html',
            link: link,
            controller: modalController
        };

        function link(scope, element, attrs) {
            scope.windowClass = attrs.windowClass || '';
            scope.modalTitle = attrs.modalTitle || '';
            scope.fadeClass = attrs.fadeClass || '';
            scope.showCloseButton = (!!attrs.showCloseButton && (attrs.showCloseButton !== 'false'));

            $timeout(function () {
                // focus a freshly-opened modal
                element[0].focus();
            }, 0, false);
        }

    }

    function modalController($scope, modalFactory) {
        $scope.closeModal = modalFactory.close;
    }

})();