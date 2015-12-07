(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('chordMoods', [{
            name: 'Major',
            value: {
                name: 'Major',
                intervals: [true, false, false, false, true, false, false, true, false, false, false, false]
            }
        },
        {
            name: 'Minor',
            value: {
                name: 'Minor',
                intervals: [true, false, false, true, false, false, false, true, false, false, false, false]
            }
        },
        {
            name: '7',
            value: {
                name: '7',
                intervals: [true, false, false, false, true, false, false, true, false, false, true, false]
            }
        },
        {
            name: 'm7',
            value: {
                name: 'm7',
                intervals: [true, false, false, true, false, false, false, true, false, false, true, false]
            }
        },
        {
            name: 'maj7',
            value: {
                name: 'maj7',
                intervals: [true, false, false, false, true, false, false, true, false, false, false, true]
            }
        },
        {
            name: '6',
            value: {
                name: '6',
                intervals: [true, false, false, false, true, false, false, true, false, true, false, false]
            }
        },
        {
            name: 'm6',
            value: {
                name: '6',
                intervals: [true, false, false, true, false, false, false, true, false, true, false, false]
            }
        }
        ]);
})();