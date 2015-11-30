(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('neuralTrainer', neuralTrainer);

    function neuralTrainer() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/neural-trainer/neural-trainer.html',
            scope: {},
            controller: 'NeuralTrainerController',
            controllerAs: 'vm'
        };
    }

})();