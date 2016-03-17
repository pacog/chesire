(function () {
    'use strict';

    angular.module('chesireApp')
        .component('soundMuter', {
            templateUrl: 'scripts/sound-muter/sound-muter.tpl.html',
            controller: 'SoundMuterController as vm'
        });
})();