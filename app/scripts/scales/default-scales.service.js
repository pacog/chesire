(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('defaultScales', [{
            name: 'Major',
            value: {
                name: 'major',
                intervals: [true, false, true, false, true, true, false, true, false, true, false, true]
            }
        },{
            name: 'Minor',
            value: {
                name: 'minor',
                intervals: [true, false, true, false, true, false, true, true, false, true, false, true]
            }
        },{
            name: 'Minor pentatonic',
            value: {
                name: 'minor_pentatonic',
                intervals: [true, false, false, true, false, true, false, true, false, false, true, false]
            }
        },{
            name: 'Hungarian minor',
            value: {
                name: 'hungarion_minor',
                intervals: [true, false, true, false, false, true, true, true, false, true, false, true]
            }
        }]);
})();