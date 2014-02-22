'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, ChordStore, Scales) {

    var oldChords = null;

    $scope.init = function() {
        $scope.chesirescale = {
            currentScale: angular.copy(DefaultScale)
        };
        oldChords = DefaultScale.chords;

        $scope.$watch('chesirescale.currentScale.chords', $scope.updateScaleObject, true);

        ChordStore.getChords().then(function(allChords) {
            $scope.allChords = allChords;
        });
    };

    $scope.updateScaleObject = function(newChords) {

        if(!Scales.isSameSetOfChords(newChords, oldChords)) {

            oldChords = angular.copy(newChords);
            $scope.chesirescale.currentScale = angular.copy($scope.chesirescale.currentScale);
        }
    };

    $scope.init();
 });