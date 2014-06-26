'use strict';

angular.module('chesireApp')

.directive('synthcomponent', function ($rootScope, $compile) {

    var getHtmlFromComponentType = function(componentInfo) {

        var html = 'Error, component directive not found';
        switch(componentInfo.type) {
            case 'oscillator':
                html = '<oscillator/>';
                break;
        }

        var angularDomEl = angular.element(html);
        var scope = $rootScope.$new(true);
        scope.componentInfo = componentInfo;
        return $compile(angularDomEl)(scope);
    };

    return {
        template: '',
        restrict: 'E',
        scope: {
            componentInfo: '='
        },
        link: function(scope, element) {
            var html = getHtmlFromComponentType(scope.componentInfo);
            element.append(html);
        }
    };
});