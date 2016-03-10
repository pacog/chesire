'use strict';

angular.module('chesireApp')
    .factory('PointerModel', function(Three, Colorpalette) {

        var POINTER_SIZE = 6;
        var POINTER_Y_CORRECTION = 3;

        var PointerModelClass = function(scene) {
            this._scene = scene;
            this._createPointer();
        };

        PointerModelClass.prototype._createPointer = function() {
            var pointerGeometry = new Three.BoxGeometry(POINTER_SIZE, POINTER_SIZE, POINTER_SIZE);
            var pointerMaterial = new Three.MeshLambertMaterial({
                color: Colorpalette.hex.POINTER,
                transparent: true,
                opacity: 0.75
            });

            this.pointerElement = new Three.Mesh(pointerGeometry, pointerMaterial);
            this.pointerElement.position.set(-1.5, 0.0, 4.0);
            this._scene.add(this.pointerElement);
        };

        PointerModelClass.prototype.update = function(pixelPosition) {
            this.pointerElement.position.set(pixelPosition.x, pixelPosition.y + POINTER_Y_CORRECTION, pixelPosition.z);
        };

        return PointerModelClass;
    });


