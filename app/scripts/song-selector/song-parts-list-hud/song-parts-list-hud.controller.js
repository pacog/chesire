(function () {
    'use strict';

    angular.module('chesireApp')
        .controller('SongPartsListHudController', SongPartsListHudController);

    function SongPartsListHudController(ScaleOptions) {
        var vm = this;

        vm.setCurrentPart = setCurrentPart;

        function setCurrentPart(part) {
            if(vm.song.getCurrentPart().index !== part.index) {
                vm.song.setCurrentPart(part);
                ScaleOptions.setScaleOptions(vm.song);
            }
        }
    }

})();