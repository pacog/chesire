'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, ScalesHelper, ScaleOptions, SongStore, UIService) {

    var oldChords = null;

    $scope.expanded = false;
    $scope.listOfSongsExpanded = false;

    var init = function() {
        ScaleOptions.getScaleOptions().then(function(scaleOptions) {
            $scope.currentScale = angular.copy(scaleOptions);
            updateSongObject($scope.currentScale.chords);
            SongStore.getSongs().then(songsStoreChanged);
            SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);
        });
    };

    var checkIfShouldCloseMenu = function(newMenuOpened) {
        if(newMenuOpened !== 'scale') {
            $scope.expanded = false;
        }
    };

    $scope.onChordChange = function(chordIndex, chord) {
        var newChords = angular.copy(oldChords);
        newChords[chordIndex] = angular.copy(chord);
        updateSongObject(newChords);
    };

    var songsStoreChanged = function(newListOfSongs) {
        $scope.availableSongs = newListOfSongs;
    };

    var updateSongObject = function(newChords) {
        if(!ScalesHelper.isSameSetOfChords(newChords, oldChords)) {
            oldChords = angular.copy(newChords);
            $scope.currentScale.chords = angular.copy(newChords);
            ScaleOptions.setScaleOptions($scope.currentScale);
        }
    };

    $scope.toggle = function() {
        $scope.expanded = !$scope.expanded;
        $scope.listOfSongsExpanded = false;
        if($scope.expanded) {
            UIService.notifyMenuOpen('scale');
        }
    };

    $scope.saveSong = function() {
        //TODO add then and loading flag
        SongStore.saveSong($scope.currentScale);
    };

    $scope.deleteSong = function() {
        //TODO add then and loading flag
        SongStore.deleteSong($scope.currentScale);
    };

    $scope.toggleListOfSongs = function() {
        $scope.listOfSongsExpanded = !$scope.listOfSongsExpanded;
    };

    $scope.selectSong = function(song) {
        $scope.listOfSongsExpanded = false;
        $scope.currentScale = song;
        updateSongObject(song.chords);
    };

    $scope.removeChordFromSong = function(indexOfChord) {
        if($scope.currentScale.chords.length>2) {
            $scope.currentScale.chords.splice(indexOfChord, 1);
            updateSongObject($scope.currentScale.chords);
        }
    };

    $scope.addChord = function() {
        $scope.currentScale.chords.push(ScalesHelper.getEmptyChord());
        updateSongObject($scope.currentScale.chords);
    };

    //TODO: on destroy: UIService.unsubscribeToMenuOpening(checkIfShouldCloseMenu);

    init();
 });