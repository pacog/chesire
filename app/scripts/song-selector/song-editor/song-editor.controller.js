(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController(ScaleOptions, songEditor, SongStore, fileSaver) {
        var vm = this;

        vm.saveSong = saveSong;
        vm.deleteSong = deleteSong;
        vm.askConfirmationDeleteSong = askConfirmationDeleteSong;
        vm.cancelDeleteSong = cancelDeleteSong;
        vm.songNameChanged = songNameChanged;
        vm.saveSongToFile = saveSongToFile;
        vm.fileSaver = fileSaver;
        vm.songLoaded = songLoaded;

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

        function songLoaded(loadedSong) {
            if(checkLoadedSongIsCorrect(loadedSong)) {
                loadedSong.name = SongStore.getUniqueName(loadedSong.name);
                vm.song = loadedSong;
                ScaleOptions.setScaleOptionsFromPreset(vm.song);
                vm.song.$isModified = true;
                vm.songEditor.notifySongHasChanged(true);
            }

        }

        function checkLoadedSongIsCorrect(song) {
            return song && song.parts && song.parts.length;
        }

    }

})();