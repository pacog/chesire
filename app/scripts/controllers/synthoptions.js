'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope, SynthOptions) {

    var init = function() {
        SynthOptions.getSynthOptions().then(function(synthOptions) {
            $scope.synthoptions = synthOptions;
        });
        //TODO: listen for changes in synth options
        //Also load the synths so we can track their values real time

    };

    init();
});
