(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongSelectorController', SongSelectorController);

    function SongSelectorController($scope, ScaleOptions) {
        var vm = this;

        init();

        function init() {
            vm.loadingFirstSong = true;
            ScaleOptions.subscribeToChangesInScaleOptions(onSongChange);
            $scope.$on('$destroy', onDestroy);
        }
        

        function onSongChange(newSong) {
            vm.loadingFirstSong = false;
            if(newSong) {
                vm.currentSong = angular.copy(newSong);
            }
        }

        function onDestroy() {
            ScaleOptions.unsubscribeToChangesInScaleOptions(onSongChange);
        }
    }

})();