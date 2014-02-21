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
          templateUrl: 'views/main.html',
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
