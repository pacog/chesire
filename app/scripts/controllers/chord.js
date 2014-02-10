'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope) {

    $scope.addNote = function() {
        $scope.chordInfo.notes.push({});
    };
});
