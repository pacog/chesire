(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('chordMoods', [{
            name: 'Major',
            value: {
                name: 'Major',
                intervals: [true, false, false, false, true, false, false, true, false, false, false, false]
            }
        },{
            name: 'Minor',
            value: {
                name: 'Minor',
                intervals: [true, false, false, true, false, false, false, true, false, false, false, false]
            }
        }]);
})();