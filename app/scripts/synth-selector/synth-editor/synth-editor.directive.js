(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('synthEditor', synthEditor);

    function synthEditor() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/synth-selector/synth-editor/synth-editor.tpl.html',
            scope: {
                synthOptions: '='
            },
            controller: 'SynthEditorController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();