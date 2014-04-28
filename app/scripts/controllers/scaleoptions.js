'use strict';

angular.module('chesireApp')

//TODO refactor all this so we get the scales from a service

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale, ChordStore, Scales, ScaleOptions) {

    var oldChords = null;

    $scope.init = function() {
        $scope.chesirescale = {
            currentScale: angular.copy(DefaultScale)
        };
        ScaleOptions.setScaleOptions($scope.chesirescale);
        oldChords = DefaultScale.chords;

        $scope.$watch('chesirescale.currentScale.chords', $scope.updateScaleObject, true);

        ChordStore.getChords().then(function(allChords) {
            $scope.allChords = allChords;
        });
    };

    $scope.updateScaleObject = function(newChords) {

        if(!Scales.isSameSetOfChords(newChords, oldChords)) {

            oldChords = angular.copy(newChords);
            ScaleOptions.setScaleOptions($scope.chesirescale);
            $scope.chesirescale.currentScale = angular.copy($scope.chesirescale.currentScale);
        }
    };

    $scope.init();
 });