(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('playerBoundaries', playerBoundaries);

    function playerBoundaries($q) {
        var subscribers = [];

        var willGetCamera = $q.defer();
        var willGetRenderer = $q.defer();
        var willGetBoundariesObject = $q.defer();

        var camera;
        var renderer;
        var boundariesObject;

        var boundaries = null;

        var factory = {
            subscribeToChange: subscribeToChange,
            unsubscribeToChange: unsubscribeToChange,
            setCamera: setCamera,
            setRenderer: setRenderer,
            setBoundariesObject: setBoundariesObject
        };

        init();

        return factory;

        function init() {
            $q.all([willGetCamera.promise, willGetRenderer.promise, willGetBoundariesObject.promise]).then(calculateBoundaries);
        }

        function subscribeToChange(callback) {
            subscribers.push(callback);
            callback(boundaries);
        }

        function unsubscribeToChange(callback) {
            subscribers = _.without(subscribers, callback);
        }

        function notifyBoundariesChanged() {
            angular.forEach(subscribers, function(callback) {
                callback(boundaries);
            });
        }

        function setCamera(newCamera) {
            camera = newCamera;
            willGetCamera.resolve(camera);
        }

        function setRenderer(newRenderer) {
            renderer = newRenderer;
            willGetRenderer.resolve(renderer);
        }

        function setBoundariesObject(newBoundariesObject) {
            boundariesObject = newBoundariesObject;
            willGetBoundariesObject.resolve(boundariesObject);
        }

        function calculateBoundaries() {
            boundariesObject.geometry.computeBoundingBox();
            var min = boundariesObject.geometry.boundingBox.min;
            var max = boundariesObject.geometry.boundingBox.max;

            boundaries = {
                min: toScreenPosition(min, camera, renderer),
                max: toScreenPosition(max, camera, renderer)
            };

            notifyBoundariesChanged();
        }

        function toScreenPosition(vector, camera, renderer) {

            var widthHalf = 0.5*renderer.context.canvas.width;
            var heightHalf = 0.5*renderer.context.canvas.height;

            vector.project(camera);

            vector.x = ( vector.x * widthHalf ) + widthHalf;
            vector.y = - ( vector.y * heightHalf ) + heightHalf;

            return { 
                x: vector.x,
                y: vector.y
            };

        }


    }

})();