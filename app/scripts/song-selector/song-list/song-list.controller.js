(function() {
    'use strict';
    angular.module('chesireApp')
        .controller('SongListController', SongListController);

    function SongListController(ScaleOptions) {
        var vm = this;

        vm.selectSong = selectSong;

        function selectSong(song) {
            ScaleOptions.setScaleOptions(song);
        }

    }

})();