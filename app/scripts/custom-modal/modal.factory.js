(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('modalFactory', customModalFactory);

    function customModalFactory(ModalInstance) {
        var currentModalInstance;

        var factory = {
            open: openModal,
            close: closeModal
        };

        return factory;

        function openModal(options) {
            closeModal();

            var newModalInstance = new ModalInstance(options);
            newModalInstance.whenReady().then(function() {
                currentModalInstance = newModalInstance;
            });

            return newModalInstance;
        }

        function closeModal() {
            if(currentModalInstance) {
                currentModalInstance.close();
            }

            currentModalInstance = null;
        }

    }

})();
