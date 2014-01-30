'use strict';

angular.module('chesireApp')
  .service('Paper', function Paper() {

        /* global paper */
        if(!paper) {
            throw 'Error, Paperjs library was not loaded';
        }
        return paper;
  });
