(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongSelectorController', SongSelectorController);

    function SongSelectorController($scope, ScaleOptions, SongStore, UIService, songEditor, DefaultScale, hotKeys) {
        var vm = this;

        var UI_SERVICE_MENU_ID = 'song-selector';

        vm.songHasBeenModified = false;

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
            songEditor.subscribeToSongChanged(songModified);
            hotKeys.on('NEXT_SONG', goToNextSong);
            hotKeys.on('PREV_SONG', goToPrevSong);
            hotKeys.on('PART_1', loadPart1);
            hotKeys.on('PART_2', loadPart2);
            hotKeys.on('PART_3', loadPart3);
            hotKeys.on('PART_4', loadPart4);
            hotKeys.on('PART_5', loadPart5);
            hotKeys.on('PART_6', loadPart6);
            hotKeys.on('PART_7', loadPart7);
            hotKeys.on('PART_8', loadPart8);
            hotKeys.on('PART_9', loadPart9);
            hotKeys.on('PART_10', loadPart10);
            $scope.$on('$destroy', onDestroy);
        }

        function onSongChange(newSong) {
            vm.loadingFirstSong = false;
            if(newSong) {
                vm.currentSong = newSong;
                updateSelectedSongIndex();
                songEditor.notifySongHasChanged(false);
            }
        }

        function onDeletedSong() {
            if(vm.songs.length === 0) {
                vm.songs[0] = angular.copy(DefaultScale);
            }
            if(vm.indexOfSelectedSong >= vm.songs.length) {
                vm.indexOfSelectedSong = vm.songs.length - 1;
            }
            ScaleOptions.setScaleOptions(vm.songs[vm.indexOfSelectedSong]);
        }

        function songModified(isSongModified) {
            vm.songHasBeenModified = isSongModified;
            if(isSongModified) {
                ScaleOptions.setScaleOptions(vm.currentSong);
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
                ScaleOptions.setScaleOptionsFromPreset(vm.songs[vm.indexOfSelectedSong]);
            }
        }

        function goToPrevSong() {
            if(vm.songs && (vm.indexOfSelectedSong > 0)) {
                vm.indexOfSelectedSong--;
                ScaleOptions.setScaleOptionsFromPreset(vm.songs[vm.indexOfSelectedSong]);
            }
        }

        function songsStoreChanged(newSongs, deletedSong) {
            vm.songs = newSongs;
            if(deletedSong) {
                onDeletedSong();
            } else {
                updateSelectedSongIndex();
            }
        }

        function updateSelectedSongIndex() {
            if(vm.songs && vm.currentSong) {
                vm.indexOfSelectedSong = _.findIndex(vm.songs, function(eachSong) {
                    return vm.currentSong && (eachSong.name === vm.currentSong.name);
                });
            }
        }

        //TODO: I know, really ugly, but don't want to over do this for now
        function loadPart1() {
            loadPart(0);
        }

        function loadPart2() {
            loadPart(1);
        }

        function loadPart3() {
            loadPart(2);
        }

        function loadPart4() {
            loadPart(3);
        }

        function loadPart5() {
            loadPart(4);
        }

        function loadPart6() {
            loadPart(5);
        }

        function loadPart7() {
            loadPart(6);
        }

        function loadPart8() {
            loadPart(7);
        }

        function loadPart9() {
            loadPart(8);
        }

        function loadPart10() {
            loadPart(9);
        }

        function loadPart(index) {
            if(index !== vm.currentSong.currentPart) {
                vm.currentSong.setCurrentPartByIndex(index);
                ScaleOptions.setScaleOptions(vm.currentSong);
            }
        }

        function onDestroy() {
            ScaleOptions.unsubscribeToChangesInScaleOptions(onSongChange);
            SongStore.unsubscribeToChangeInAllSongs(songsStoreChanged);
            songEditor.unsubscribeToSongChanged(songModified);
            songEditor.unsubscribeToSongDeleted(onDeletedSong);
            hotKeys.off('NEXT_SONG', goToNextSong);
            hotKeys.off('PREV_SONG', goToPrevSong);
            hotKeys.off('PART_1', loadPart1);
            hotKeys.off('PART_2', loadPart2);
            hotKeys.off('PART_3', loadPart3);
            hotKeys.off('PART_4', loadPart4);
            hotKeys.off('PART_5', loadPart5);
            hotKeys.off('PART_6', loadPart6);
            hotKeys.off('PART_7', loadPart7);
            hotKeys.off('PART_8', loadPart8);
            hotKeys.off('PART_9', loadPart9);
            hotKeys.off('PART_10', loadPart10);
        }
    }

})();