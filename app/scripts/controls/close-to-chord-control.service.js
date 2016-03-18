(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('closeToChordControl', closeToChordControl);

    function closeToChordControl(MultiNotesHelper) {
        var factory = {
            getValue: getValue
        };

        return factory;

        function getValue(hand, otherValues) {
            var result = 0.5;
            var chordsRelevance = MultiNotesHelper.getChordsRelevanceFromX(otherValues.x) || [];
            for(var i=0; i<chordsRelevance.length; i++) {
                if(chordsRelevance[i] > result) {
                    result = chordsRelevance[i];
                }
            }

            result = (result - 0.5)*2;

            return result;
        }
    }

})();