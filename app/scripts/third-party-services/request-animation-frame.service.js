'use strict';

angular.module('chesireApp')

.service('requestanimationframe', function Requestanimationframe() {

    return  (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame);
});
