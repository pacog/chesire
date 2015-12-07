(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('defaultScales', [{
            name: 'Major',
            value: {
                name: 'Major',
                intervals: [true, false, true, false, true, true, false, true, false, true, false, true]
            }
        },
        {
            name: 'Minor',
            value: {
                name: 'Minor',
                intervals: [true, false, true, true, false, true, false, true, true, false, true, false]
            }
        },
        {
            name: 'Melodic minor',
            value: {
                name: 'Melodic minor',
                intervals: [true, false, true, true, false, true, true, true, false, true, false, true]
            }
        },
        {
            name: 'Minor pentatonic',
            value: {
                name: 'Minor pentatonic',
                intervals: [true, false, false, true, false, true, false, true, false, false, true, false]
            }
        },
        {
            name: 'Major pentatonic',
            value: {
                name: 'Major pentatonic',
                intervals: [true, false, true, false, true, false, false, true, false, true, false, false]
            }
        },
        {
            name: 'Blues',
            value: {
                name: 'Blues',
                intervals: [true, false, false, true, false, true, true, true, false, false, true, false]
            }
        },
        {
            name: 'Hungarian minor',
            value: {
                name: 'Hungarian minor',
                intervals: [true, false, true, false, false, true, true, true, false, true, false, true]
            }
        },
        {
            name: 'Persian',
            value: {
                name: 'Persian',
                intervals: [true, true, false, false, true, true, true, false, true, false, false, true]
            }
        },
        {
            name: 'Hirojoshi',
            value: {
                name: 'Hirojoshi',
                intervals: [true, false, true, true, false, false, false, true, true, false, false, false]
            }
        },
        {
            name: 'Arabian',
            value: {
                name: 'Arabian',
                intervals: [true, false, true, false, true, true, true, false, true, false, true, false]
            }
        },
        {
            name: 'Scottish',
            value: {
                name: 'Scottish',
                intervals: [true, false, true, false, false, true, false, true, false, true, false, false]
            }
        }
        ]);
})();