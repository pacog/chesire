(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('singleControlHud', singleControlHud);

    function singleControlHud() {
        return {
            templateUrl: 'scripts/controls-hud/single-control-hud.html',
            restrict: 'E',
            scope: {
                controlInfo: '=',
                relatedParam: '@'
            },
            controller: 'SingleControlHudController',
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };

        function link(scope, element) {
            var bar = angular.element(element[0].querySelector('.js-single-control-hud-value-inner'));

            scope.vm.updateOutputValue = function(newValue) {
                var translateValue = 'translate3d(' + (newValue - 100) + '%, 0, 0)';
                bar.css({
                    '-webkit-transform': translateValue,
                    '-moz-transform': translateValue,
                    'msTransform': translateValue,
                    'transform': translateValue
                });
            };
        }
    }
})();
