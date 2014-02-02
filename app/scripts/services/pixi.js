'use strict';

angular.module('chesireApp')

.service('Pixi', function Pixi() {
    /* global PIXI */
    if(!PIXI) {
        throw 'Error, pixi.js library was not loaded';
    }
    return PIXI;
});
