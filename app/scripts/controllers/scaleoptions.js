'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, Scales, ScaleOptions, SongStore) {

    var oldChords = null;

    $scope.expanded = false;
    $scope.listOfSongsExpanded = false;

    var init = function() {
        //TODO: use the previous saved song
        $scope.currentScale = angular.copy(DefaultScale);
        ScaleOptions.setScaleOptions($scope.currentScale);
        oldChords = angular.copy($scope.currentScale.chords);
        SongStore.getSongs().then(songsStoreChanged);
        SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
    };

    $scope.onChordChange = function(chordIndex, chord) {
        var newChords = angular.copy(oldChords);
        newChords[chordIndex] = angular.copy(chord);
        updateScaleObject(newChords);
    };

    var songsStoreChanged = function(newListOfSongs) {
        $scope.availableSongs = newListOfSongs;
    };

    var updateScaleObject = function(newChords) {
        if(!Scales.isSameSetOfChords(newChords, oldChords)) {
            oldChords = angular.copy(newChords);
            $scope.currentScale.chords = angular.copy(newChords);
            ScaleOptions.setScaleOptions($scope.currentScale);
        }
    };

    $scope.toggle = function() {
        $scope.expanded = !$scope.expanded;
        $scope.listOfSongsExpanded = false;
    };

    $scope.saveSong = function() {
        //TODO add then and loading flag
        SongStore.saveSong($scope.currentScale);
        console.log('Song saved');
    };

    $scope.deleteSong = function() {
        //TODO add then and loading flag
        SongStore.deleteSong($scope.currentScale);
        console.log('Song deleted');
    };

    $scope.toggleListOfSongs = function() {
        $scope.listOfSongsExpanded = !$scope.listOfSongsExpanded;
    };

    $scope.selectSong = function(song) {
        $scope.listOfSongsExpanded = false;
        $scope.currentScale = song;
        updateScaleObject(song.chords);
    };

    init();
 });