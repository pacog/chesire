(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SongPartModel', SongPartModel);

    function SongPartModel(DefaultScale) {
        var factory = {
            create: create
        };

        var DEFAULT_PART_OPTIONS = DefaultScale;

        function SongPartClass(options) {
            this.init(options);
            this.$$isSongPart = true;
        }

        SongPartClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_PART_OPTIONS, options);
        };

        return factory;

        function create(options) {
            return new SongPartClass(options);
        }
    }


})();