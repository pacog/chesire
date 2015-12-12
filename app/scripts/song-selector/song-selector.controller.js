(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongSelectorController', SongSelectorController);

    function SongSelectorController($scope, ScaleOptions, SongStore) {
        var vm = this;

        vm.toggleSongList = toggleSongList;
        vm.toggleSongEditor = toggleSongEditor;
        vm.goToNextSong = goToNextSong;
        vm.goToPrevSong = goToPrevSong;

        init();

        function init() {
            vm.loadingFirstSong = true;
            ScaleOptions.subscribeToChangesInScaleOptions(onSongChange);
            SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function onSongChange(newSong) {
            vm.loadingFirstSong = false;
            if(newSong) {
                vm.currentSong = angular.copy(newSong);
                updateSelectedSongIndex();
            }
        }

        function toggleSongList() {
            vm.showSongList = !vm.showSongList;
        }

        function toggleSongEditor() {
            vm.songEditorShown = !vm.songEditorShown;
        }

        function goToNextSong() {
            if(vm.songs && (vm.indexOfSelectedSong < (vm.songs.length - 1))) {
                vm.indexOfSelectedSong++;
                ScaleOptions.setScaleOptions(vm.songs[vm.indexOfSelectedSong]);
            }
        }

        function goToPrevSong() {
            if(vm.songs && (vm.indexOfSelectedSong > 0)) {
                vm.indexOfSelectedSong--;
                ScaleOptions.setScaleOptions(vm.songs[vm.indexOfSelectedSong]);
            }
        }

        function songsStoreChanged(newSongs) {
            vm.songs = newSongs;
            updateSelectedSongIndex();
        }

        function updateSelectedSongIndex() {
            if(vm.songs && vm.currentSong) {
                vm.indexOfSelectedSong = _.findIndex(vm.songs, function(eachSong) {
                    return vm.currentSong && (eachSong.name === vm.currentSong.name);
                });
            }
        }

        function onDestroy() {
            ScaleOptions.unsubscribeToChangesInScaleOptions(onSongChange);
            SongStore.unsubscribeToChangeInAllSongs(songsStoreChanged);
        }
    }

})();