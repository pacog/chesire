'use strict';

angular.module('chesireApp')

//TODO refactor all this so we get the scales from a service

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, ChordStore, Scales, ScaleOptions) {

    var oldChords = null;

    $scope.expanded = false;

    var init = function() {
        $scope.currentScale = angular.copy(DefaultScale);
        ScaleOptions.setScaleOptions($scope.currentScale);
        oldChords = angular.copy($scope.currentScale.chords);
    };

    $scope.onChordChange = function(chordIndex, chord) {
        var newChords = angular.copy(oldChords);
        newChords[chordIndex] = angular.copy(chord);
        updateScaleObject(newChords);
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
    };

    init();
 });