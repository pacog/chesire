'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, $timeout, Scales) {

    $scope.notes = Scales.getAllNotes();
});
