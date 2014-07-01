'use strict';

angular.module('chesireApp')

.filter('frequencyToPercentage', function(Notes) {

    var log2 = function(x) {
        return Math.log(x) / Math.LN2;
    };

    return function(freq) {
        var firstNote = log2(_.first(Notes).freq);
        var lastNote = log2(_.last(Notes).freq);
        var ourNote = log2(freq);

        return 100*(ourNote-firstNote)/(lastNote-firstNote);
    };
});