'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale) {

    var oldScale = null;

    $scope.init = function() {
        $scope.chesirescale = {
            currentScale: angular.copy(DefaultScale)
        };
        oldScale = DefaultScale;
    };

    $scope.saveScale = function() {

        angular.forEach($scope.chesirescale.currentScale.chords, function(chord) {
            //We make sure the notes are ordered by frequency
            chord.notes = _.sortBy(chord.notes, function(note){
                return note.freq;
            });
        });
        $scope.chesirescale.currentScale = angular.copy($scope.chesirescale.currentScale);
        oldScale = angular.copy($scope.chesirescale.currentScale);
    };

    $scope.cancelScale = function() {

        $scope.chesirescale.currentScale = angular.copy(oldScale);
    };

    $scope.init();
 });