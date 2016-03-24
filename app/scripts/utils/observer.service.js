(function() {
    'use strict';

    angular.module('chesireApp')
        .service('ObserverFactory', ObserverFactory);

    function ObserverFactory() {
        var factory = {
            create: create
        };
        return factory;

        function create(options) {
            return new Observer(options);
        }
    }

    function Observer(options) {
        this.init(options);
    }

    Observer.prototype = {
        init: function(options) {
            this.subscribers = [];
            options = options || {};
            this.callbackOnSubscribe = !!options.callbackOnSubscribe;
            this.currentValue = undefined;
        },
        subscribe: function(callback) {
            this.subscribers.push(callback);
            if(this.callbackOnSubscribe) {
                callback(this.currentValue);
            }
        },
        unsubscribe: function(callback) {
            this.subscribers = _.without(this.subscribers, callback);
        },
        notify: function(newValue) {
            this.currentValue = newValue;
            for(var i=0; i<this.subscribers.length; i++) {
                this.subscribers[i](this.currentValue);
            }
        }
    };

})();