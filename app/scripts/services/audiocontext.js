'use strict';

angular.module('chesireApp')

.factory('Audiocontext', function Audiocontext() {

    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass) {
        throw 'Error, AudioContext not available in your browser';
    }
    return new AudioContextClass();
});
