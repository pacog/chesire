(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('fileSaver', fileSaver);

    function fileSaver() {
        var factory = {
            save: save,
            isAvailable: isAvailable
        };
        return factory;

        function save(object, name) {
            
            if(!isAvailable()) {
                throw 'Error, cannot save files';
            }
            name = name || 'chesire';
            name = name.replace(new RegExp(' ', 'g'), '_');
            name = name.toLowerCase();
            name += '.json';
            object = angular.toJson(object, 4);
            var blob = new Blob([object], {type: "text/plain;charset=utf-8"});
            window.saveAs(blob, name);
        }

        function isAvailable() {
            return !!Blob && !!window.saveAs;
        }
    }

})();