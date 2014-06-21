'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope, SynthOptions) {

    var init = function() {
        SynthOptions.getSynthOptions().then(function(synthOptions) {
            $scope.synthoptions = synthOptions;
        });
    };

    init();
});
