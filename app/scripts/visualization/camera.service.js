'use strict';

angular.module('chesireApp')
    .factory('Camera', function(Three, SpaceConverter) {

        var Y_INCLINATION = 50;
        var Z_DISTANCE = 400;

        var CameraClass = function(scene, options) {
            this._scene = scene;
            this._options = options;
            this._createCamera();
        };

        CameraClass.prototype.getCamera = function() {
            return this.camera;
        };

        CameraClass.prototype._createCamera = function() {
            var boxCenter = SpaceConverter.getBoxCenter();
            this.camera = new Three.PerspectiveCamera( 45, this._options.screenWidth / this._options.screenHeight, 0.1, 1000 );

            this.camera.position.x = boxCenter.x;
            this.camera.position.y = boxCenter.y + Y_INCLINATION;
            this.camera.position.z = Z_DISTANCE;
            this.camera.lookAt(new Three.Vector3(boxCenter.x, boxCenter.y,0));
        };

        return CameraClass;
    });