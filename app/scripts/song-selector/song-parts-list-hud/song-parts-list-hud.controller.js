(function () {
    'use strict';

    angular.module('chesireApp')
        .controller('SongPartsListHudController', SongPartsListHudController);

    function SongPartsListHudController(ScaleOptions) {
        var vm = this;

        vm.setCurrentPart = setCurrentPart;
        vm.onDrop = onDrop;

        function setCurrentPart(part) {
            if(vm.song.getCurrentPart().index !== part.index) {
                vm.song.setCurrentPart(part);
                ScaleOptions.setScaleOptions(vm.song);
            }
        }

        function onDrop(data, event, destinationIndex) {
            var originIndex = data['json/song-part-hud'].partIndex;
            var moved = vm.song.movePart(originIndex, destinationIndex);
            if(moved) {
                ScaleOptions.setScaleOptions(vm.song);
            }
        }
    }

})();