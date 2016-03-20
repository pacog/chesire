(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('availableComponents', [
            {
                name: 'EQ',
                value: 'eq'
            },{
                name: 'Delay',
                value: 'delay'
            },{
                name: 'Tremolo',
                value: 'tremolo'
            },{
                name: 'Distortion',
                value: 'distortion'
            }
        ]);
})();