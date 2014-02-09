'use strict';

angular.module('chesireApp')

  .constant('DefaultScale', {
        name: 'Default',
        notes: [{
            name: 'A4',
            freq: 440
        }, {
            name: 'B4',
            freq: 493.88
        }, {
            name: 'C4',
            freq: 523.25
        }, {
            name: 'D5',
            freq: 587.33
        }, {
            name: 'E5',
            freq: 659.25
        }, {
            name: 'F5',
            freq: 698.46
        }]
    });
