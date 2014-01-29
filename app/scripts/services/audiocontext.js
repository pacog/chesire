'use strict';

angular.module('chesireApp')

.service('Audiocontext', function Audiocontext() {

    var audioContext = window.AudioContext || window.webkitAudioContext;
    if(!audioContext) {
        throw 'Error, AudioContext not available in your browser';
    }
    return audioContext;
});
