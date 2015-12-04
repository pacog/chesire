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
        }]);
})();