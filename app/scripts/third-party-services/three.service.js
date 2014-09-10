'use strict';

angular.module('chesireApp')

.service('Three', function Three() {
    /* global THREE */
    if(!THREE) {
        throw 'Error, Three.js library was not loaded';
    }
    return THREE;
});
