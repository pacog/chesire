(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('ModalInstance', ModalInstance);

    function ModalInstance($q, $http, $templateCache, $injector, $rootScope, $controller, $compile, $document, $timeout) {

        var body;
        var SHOWN_CLASS = 'is-shown';
        var HIDE_DELAY = 200;

        var ModalClass = function(options) {
            this._init(options);
        };

        ModalClass.prototype._init = function(options) {
            this._isBeingCreated = true;
            this.options = processOptions(options);
            this._resultPromise = $q.defer();
            this._willCreateModal = $q.defer();
            this.result = this._resultPromise.promise;

            whenOptionsPromisesAreResolved(this.options)
                .then(
                    angular.bind(this, this._createModal),
                    angular.bind(this, this._errorCreatingModal)
                );

        };

        ModalClass.prototype.whenReady = function() {
            return this._willCreateModal.promise;
        };

        ModalClass.prototype.close = function(params) {
            if(this._isBeingCreated) {
                return;
            }
            if(this._resultPromise) {
                this._resultPromise.resolve(params);
            }

            if(this.modalScope) {
                this.modalScope.$destroy();
            }

            if(this.backdropScope) {
                this.backdropScope.$destroy();
            }

            if(this.modalHtml) {
                removeShownClassAndRemove(this.modalHtml);
            }

            if(this.backdropHtml) {
                removeShownClassAndRemove(this.backdropHtml);
            }

            this._resultPromise = null;
            this._willCreateModal = null;
            this.modalScope = null;
            this.backdropScope = null;
            this.modalHtml = null;
            this.backdropHtml = null;
        };

        ModalClass.prototype._createModal = function(contentAndVars) {
            this._instantiateNewModalController(contentAndVars);

            var modalContent = contentAndVars[0];
            this._createModalContent(modalContent);
            this._createBackdrop();
            this._isBeingCreated = false;
            this._willCreateModal.resolve();
        };

        ModalClass.prototype._errorCreatingModal = function() {
            this._isBeingCreated = false;
            this._resultPromise.reject();
            this._willCreateModal.reject();
        };

        ModalClass.prototype._instantiateNewModalController = function(contentAndVars) {
            this.modalScope = $rootScope.$new();
            var controllerLocals = {};
            var resolveIteration = 1;

            if (this.options.controller) {
                controllerLocals.$scope = this.modalScope;
                controllerLocals.currentModalInstance = this;
                angular.forEach(this.options.resolve, function (value, key) {
                    controllerLocals[key] = contentAndVars[resolveIteration++];
                });

                $controller(this.options.controller, controllerLocals);
            }
        };

        ModalClass.prototype._createModalContent = function(modalContent) {
            var beforeCompileModalElement = angular.element('<modal></modal>');
            beforeCompileModalElement.attr('window-class', this.options.windowClass);
            beforeCompileModalElement.attr('modal-title', this.options.modalTitle);
            beforeCompileModalElement.attr('show-close-button', this.options.showCloseButton);

            beforeCompileModalElement.html(modalContent);
            this.modalHtml = $compile(beforeCompileModalElement)(this.modalScope);

            getBody().append(this.modalHtml);
            applyShownClass(this.modalHtml);
        };

        ModalClass.prototype._createBackdrop = function() {
            this.backdropScope = $rootScope.$new(true);
            var backdropDomElCreator = angular.element('<modal-backdrop></modal-backdrop>');
            backdropDomElCreator.attr('backdrop-class', this.options.backdropClass);
            backdropDomElCreator.attr('avoid-backdrop-closing', this.options.avoidBackdropClosing);
            this.backdropHtml = $compile(backdropDomElCreator)(this.backdropScope);

            getBody().append(this.backdropHtml);
            applyShownClass(this.backdropHtml);
        };


        return ModalClass;

        function processOptions(options) {
            options.resolve = options.resolve || {};
            if (!options.template && !options.templateUrl) {
                throw new Error('custommodal: One of template or templateUrl options is required.');
            }

            return options;
        }

        function whenOptionsPromisesAreResolved(options) {
            return $q.all([getTemplatePromise(options)].concat(getResolvePromises(options.resolve)));
        }

        function getTemplatePromise(options) {
            return options.template ?
                $q.when(options.template) :
                $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                    return result.data;
                });
        }

        function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
                if (angular.isFunction(value) || angular.isArray(value)) {
                    promisesArr.push($q.when($injector.invoke(value)));
                }
            });
            return promisesArr;
        }


        function getBody() {
            body = body || $document.find('body').eq(0);
            return body;
        }

        function applyShownClass(element) {
            $timeout(function() {
                if(element) {
                    element.addClass(SHOWN_CLASS);
                }
            }, 0, false);
        }

        function removeShownClassAndRemove(element) {
            if(element) {
                element.removeClass(SHOWN_CLASS);
                $timeout(function() {
                    element.remove();
                }, HIDE_DELAY, false);
            }
        }

    }

})();