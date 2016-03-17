(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SoundMuterController', SoundMuterController);

    function SoundMuterController(soundMuter) {
        var vm = this;

        vm.soundMuter = soundMuter;
    }

})();