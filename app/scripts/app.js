'use strict';

angular.module('chesireApp', [
    'ngRoute',
    'LocalStorageModule',
    'draganddrop'
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'scripts/app/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('chesire');
})
;
