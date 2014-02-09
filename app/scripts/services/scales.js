'use strict';

angular.module('chesireApp')

.factory('Scales', function (Notes) {

    var notes = Notes;

    return {
        getAllNotes: function () {
            return notes;
        }
    };
});
