(function() {
    'use strict';
    angular.module('chesireApp')
        .controller('SongListController', SongListController);

    function SongListController($scope, SongStore, ScaleOptions) {
        var vm = this;

        vm.selectSong = selectSong;

        init();

        function init() {
            SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function songsStoreChanged(newSongs) {
            vm.songs = newSongs;
        }

        function selectSong(song) {
            ScaleOptions.setScaleOptions(song);
        }

        function onDestroy() {
            SongStore.unsubscribeToChangeInAllSongs(songsStoreChanged);
        }

    }

})();