'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, Scales, ScaleOptions, SongStore, LastUsedSettingsStore) {

    var oldChords = null;

    $scope.expanded = false;
    $scope.listOfSongsExpanded = false;

    var init = function() {

        LastUsedSettingsStore.getLastUsedSong().then(function(lastUsedSong) {
            if(!lastUsedSong) {
                lastUsedSong = DefaultScale;
            }
            $scope.currentScale = angular.copy(lastUsedSong);
            ScaleOptions.setScaleOptions($scope.currentScale);
            oldChords = angular.copy($scope.currentScale.chords);
            SongStore.getSongs().then(songsStoreChanged);
            SongStore.subscribeToChangeInAllSongs(songsStoreChanged);
            LastUsedSettingsStore.notifyLastUsedSongChanged($scope.currentScale);
        });
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
        if(!Scales.isSameSetOfChords(newChords, oldChords)) {
            oldChords = angular.copy(newChords);
            $scope.currentScale.chords = angular.copy(newChords);
            ScaleOptions.setScaleOptions($scope.currentScale);
            LastUsedSettingsStore.notifyLastUsedSongChanged($scope.currentScale);
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
        updateSongObject(song.chords);
    };

    $scope.removeChordFromSong = function(indexOfChord) {
        if($scope.currentScale.chords.length>2) {
            $scope.currentScale.chords.splice(indexOfChord, 1);
            updateSongObject($scope.currentScale.chords);
        }
    };

    $scope.addChord = function() {
        $scope.currentScale.chords.push(Scales.getEmptyChord());
        updateSongObject($scope.currentScale.chords);
    };

    init();
 });