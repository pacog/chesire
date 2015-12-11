'use strict';

angular.module('chesireApp')

    .controller('MainCtrl', function (ScaleOptions, SongStore) {
        ScaleOptions.init();
        SongStore.getSongs();
    });
