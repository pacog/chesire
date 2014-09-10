'use strict';

angular.module('chesireApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule'
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'scripts/app/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('chesire');
})
;
