(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController(songEditor, SongStore, fileSaver) {
        var vm = this;

        vm.saveSong = saveSong;
        vm.deleteSong = deleteSong;
        vm.askConfirmationDeleteSong = askConfirmationDeleteSong;
        vm.cancelDeleteSong = cancelDeleteSong;
        vm.songNameChanged = songNameChanged;
        vm.saveSongToFile = saveSongToFile;
        vm.fileSaver = fileSaver;

        vm.songEditor = songEditor;

        init();

        function init() {
        }

        function songNameChanged() {
            vm.song.$isModified = true;
            vm.songEditor.notifySongHasChanged(true);
        }

        function askConfirmationDeleteSong() {
            vm.confirmingDeleteSong = true;
        }

        function cancelDeleteSong() {
            vm.confirmingDeleteSong = false;
        }

        function saveSong() {
            SongStore.saveSong(vm.song);
        }

        function saveSongToFile() {
            fileSaver.save(vm.song, vm.song.name || 'song');
        }

        function deleteSong() {
            SongStore.deleteSong(vm.song);
            vm.confirmingDeleteSong = false;
        }

    }

})();