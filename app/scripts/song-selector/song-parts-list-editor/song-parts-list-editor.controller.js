(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongPartsListEditor', SongPartsListEditor);

    function SongPartsListEditor(ScaleOptions) {
        var vm = this;
        
        vm.setCurrentPart = setCurrentPart;
        vm.addPart = addPart;
        vm.onDrop = onDrop;

        function setCurrentPart(part) {
            if(vm.song.getCurrentPart().index !== part.index) {
                vm.song.setCurrentPart(part);
                ScaleOptions.setScaleOptions(vm.song);
            }
        }

        function addPart() {
            var newPart = vm.song.addPart();
            setCurrentPart(newPart);
        }

        function onDrop(data, event, destinationIndex) {
            var originIndex = data['json/song-part-editor'].partIndex;
            var moved = vm.song.movePart(originIndex, destinationIndex);
            if(moved) {
                ScaleOptions.setScaleOptions(vm.song);
            }
        }
    }
    
})();