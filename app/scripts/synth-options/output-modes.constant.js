(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('outputModes', [{
            name: 'Audio',
            value: 'audio'
        }, {
            name: 'MIDI',
            value: 'midi'
        }]);

})();