(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('MainController', MainController);

    function MainController(ScaleOptions, SongStore, UIService) {
        var vm = this;

        vm.closeAllPopopovers = closeAllPopopovers;

        init();

        function init() {
            ScaleOptions.init();
            SongStore.getSongs();
        }

        function closeAllPopopovers() {
            UIService.notifyMenuOpen('no-menu');
        }
    }

})();

