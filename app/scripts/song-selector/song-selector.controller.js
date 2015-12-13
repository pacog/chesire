(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongSelectorController', SongSelectorController);

    function SongSelectorController($scope, ScaleOptions, SongStore, UIService) {
        var vm = this;

        var UI_SERVICE_MENU_ID = 'song-selector';

        vm.toggleSongList = toggleSongList;
        vm.toggleSongEditor = toggleSongEditor;
        vm.goToNextSong = goToNextSong;
        vm.goToPrevSong = goToPrevSong;

        init();

        function init() {
            vm.loadingFirstSong = true;
            ScaleOptions.subscribeToChangesInScaleOptions(onSongChange);
            SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);
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
            if(vm.showSongList) {
                vm.songEditorShown = false;
                UIService.notifyMenuOpen(UI_SERVICE_MENU_ID);
            }
        }

        function toggleSongEditor() {
            vm.songEditorShown = !vm.songEditorShown;
            if(vm.songEditorShown) {
                vm.showSongList = false;
                UIService.notifyMenuOpen(UI_SERVICE_MENU_ID);
            }
        }

        function checkIfShouldCloseMenu(newMenuOpened) {
            if(newMenuOpened !== UI_SERVICE_MENU_ID) {
                vm.songEditorShown = false;
                vm.showSongList = false;
            }
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