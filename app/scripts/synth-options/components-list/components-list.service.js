(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('componentsList', componentsList);

    function componentsList() {
        var activeItem = null;

        var factory = {
            setActiveItem: setActiveItem,
            getActiveItem: getActiveItem
        };
        return factory;

        function setActiveItem(newActiveItem) {
            activeItem = newActiveItem;
        }

        function getActiveItem() {
            return activeItem;
        }
    }

})();