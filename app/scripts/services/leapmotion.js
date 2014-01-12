'use strict';

angular.module('chesireApp')

.service('Leapmotion', function Leapmotion() {
    /* global Leap */
    if(!Leap) {
        throw 'Error, LeapMotion library was not loaded';
    }
    return Leap;
});
