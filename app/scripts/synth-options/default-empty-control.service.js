'use strict';

angular.module('chesireApp')

  .constant('DefaultEmptyControl', {
        number: 1,
        param: 'y',
        responseFunction: {
            inverse: false,
            min: 0,
            max: 0,
            name: 'linear'
        }
    });