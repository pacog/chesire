(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('defaultScales', [{
            name: 'Major',
            value: {
                name: 'Major',
                intervals: [true, false, true, false, true, true, false, true, false, true, false, true]
            }
        },{
            name: 'Minor',
            value: {
                name: 'Minor',
                intervals: [true, false, true, false, true, false, true, true, false, true, false, true]
            }
        },{
            name: 'Minor pentatonic',
            value: {
                name: 'Minor pentatonic',
                intervals: [true, false, false, true, false, true, false, true, false, false, true, false]
            }
        },{
            name: 'Hungarian minor',
            value: {
                name: 'Hungarian minor',
                intervals: [true, false, true, false, false, true, true, true, false, true, false, true]
            }
        }]);
})();