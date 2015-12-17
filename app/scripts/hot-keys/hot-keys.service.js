(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('hotKeys', hotKeys);

    function hotKeys($window) {

        var actions = {
            NEXT_SONG: {
                keyCode: 39
            },
            PREV_SONG: {
                keyCode: 37
            }
        };
        var subscribers = {};

        var factory = {
            on: on,
            off: off,
            actions: actions
        };

        init();

        return factory;

        function init() {
            var body = angular.element($window.document.querySelector('body'));

            body.on('keyup', onKeyUp);
        }

        function on(eventName, callback) {
            subscribers[eventName] = subscribers[eventName] || [];
            subscribers[eventName].push(callback);
        }

        function off(eventName, callback) {
            if(subscribers[eventName]) {
                subscribers[eventName] = _.without(subscribers[eventName], callback);
            }
        }

        function onKeyUp(keyInfo) {
            
            var action = getActionFromKey(keyInfo);
            if(action) {
                notifyAction(action);
            }
        }

        function getActionFromKey(keyInfo) {
            var action;
            for(var actionName in actions) {
                action = actions[actionName];
                if(action.keyCode === keyInfo.keyCode) {
                    action.name = actionName;
                    return action;
                }
            }
        }

        function notifyAction(action) {
            angular.forEach(subscribers[action.name], function(callback) {
                callback(action.params);
            });
        }
    }

})();