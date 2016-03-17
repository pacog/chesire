(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('fileLoader', fileLoader);

    function fileLoader($timeout) {
        return {
            restrict: 'E',
            scope: {
                'onLoad': '='
            },
            templateUrl: 'scripts/file-loader/file-loader.tpl.html',
            controller: 'FileLoaderController',
            controllerAs: 'vm',
            bindToController: true,
            link: link,
            replace: true
        };

        function link(scope, element) {
            var input;
            var reader = new FileReader();
            reader.onload = fileHasBeenRead;

            init();

            function init() {
                scope.$on('$destroy', onDestroy);
                input = angular.element(element[0].querySelector('.js-file-input'));
                input.on('change', onInputChange);
            }

            function onDestroy() {
                input.off('change', onInputChange);
            }

            function onInputChange() {
                if(input[0].files && input[0].files[0]) {
                    reader.readAsText(input[0].files[0]);
                }
            }

            function fileHasBeenRead() {
                var result = angular.fromJson(reader.result);
                if(scope.vm.onLoad && angular.isFunction(scope.vm.onLoad)) {
                    $timeout(function() {
                        scope.vm.onLoad(result);
                    });
                }
            }

        }
    }

})();