(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController($scope, songEditor, SongStore) {
        var vm = this;

        vm.saveSong = saveSong;
        vm.deleteSong = deleteSong;
        vm.askConfirmationDeleteSong = askConfirmationDeleteSong;
        vm.cancelDeleteSong = cancelDeleteSong;

        vm.songEditor = songEditor;
        vm.songHasBeenModified = false;

        init();

        function init() {
            songEditor.subscribeToSongChanged(songModified);
            $scope.$on('$destroy', onDestroy);
        }

        function askConfirmationDeleteSong() {
            vm.confirmingDeleteSong = true;
        }

        function cancelDeleteSong() {
            vm.confirmingDeleteSong = false;
        }

        function songModified(isSongModified) {
            vm.songHasBeenModified = isSongModified;
        }

        function saveSong() {
            SongStore.saveSong(vm.song);
        }

        function deleteSong() {
            SongStore.deleteSong(vm.song);
            vm.confirmingDeleteSong = false;
        }

        function onDestroy() {
            songEditor.unsubscribeToSongChanged(songModified);
        }

    }

})();