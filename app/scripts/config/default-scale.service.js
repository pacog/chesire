'use strict';

angular.module('chesireApp')

  .constant('DefaultScale', {
        name: 'Default',
        chords: [{
            notes: [{
                name: 'A4',
                freq: 440,
                midi: 69
            }]
        },{
            notes: [{
                name: 'A4',
                freq: 440,
                midi: 69
            }]
        }]
    });
