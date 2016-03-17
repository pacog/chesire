(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('MainController', MainController);

    function MainController(ScaleOptions, SongStore, SynthOptions, SynthStore, UIService, soundMuter) {
        var vm = this;

        vm.closeAllPopopovers = closeAllPopopovers;

        init();

        function init() {
            ScaleOptions.init();
            SongStore.getSongs();
            SynthOptions.init();
            SynthStore.getSynths();
            soundMuter.init();
        }

        function closeAllPopopovers() {
            UIService.notifyMenuOpen('no-menu');
        }
    }

})();

