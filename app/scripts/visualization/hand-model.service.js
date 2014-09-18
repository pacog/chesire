'use strict';

angular.module('chesireApp')
    .factory('HandModel', function(Three, Colorpalette, SpaceConverter, Leapmotion) {
        var HAND_DEFAULT_OPACITY = 0.5;
        var FINGER_NAMES = ['pinky', 'indexFinger', 'ringFinger', 'middleFinger'];
        var VERTICES_PER_FINGER = 8;
        var FINGER_THICKNESS = 5;

        var HandModelClass = function(scene) {
            this._scene = scene;
            this._createHand();
        };

        HandModelClass.prototype._createHand = function() {
            this._handGeometry = this._createGeometry();
            var material = new Three.MeshLambertMaterial({
                color: Colorpalette.hex.HAND,
                transparent: true,
                opacity: HAND_DEFAULT_OPACITY
            });
            var handMesh = new Three.Mesh(this._handGeometry, material);
            this._scene.add(handMesh);
        };

        HandModelClass.prototype._createGeometry = function() {
            var geometry = new Three.Geometry();
            var verticesAlreadyAdded = 0;
            for(var i=0; i<FINGER_NAMES.length; i++) {
                this[FINGER_NAMES[i]] = {
                    verticesStart: verticesAlreadyAdded
                };
                for(var j=0; j<VERTICES_PER_FINGER; j++) {
                    geometry.vertices.push( new Three.Vector3(1, 1, 1 ) );
                }
                this._createFacesForFinger(geometry, verticesAlreadyAdded);
                verticesAlreadyAdded += VERTICES_PER_FINGER;
            }
            geometry.computeFaceNormals();
            return geometry;
        };

        HandModelClass.prototype._createFacesForFinger = function(geometry, verticesStart) {
            geometry.faces.push(new Three.Face3( verticesStart+0, verticesStart+2, verticesStart+1 ));
            geometry.faces.push(new Three.Face3( verticesStart+1, verticesStart+2, verticesStart+3 ));
            geometry.faces.push(new Three.Face3( verticesStart+2, verticesStart+4, verticesStart+3 ));
            geometry.faces.push(new Three.Face3( verticesStart+3, verticesStart+4, verticesStart+5 ));
            geometry.faces.push(new Three.Face3( verticesStart+4, verticesStart+6, verticesStart+5 ));
            geometry.faces.push(new Three.Face3( verticesStart+5, verticesStart+6, verticesStart+7 ));
            //Recverse sides:
            geometry.faces.push(new Three.Face3( verticesStart+0, verticesStart+1, verticesStart+2 ));
            geometry.faces.push(new Three.Face3( verticesStart+1, verticesStart+3, verticesStart+2 ));
            geometry.faces.push(new Three.Face3( verticesStart+2, verticesStart+3, verticesStart+4 ));
            geometry.faces.push(new Three.Face3( verticesStart+3, verticesStart+5, verticesStart+4 ));
            geometry.faces.push(new Three.Face3( verticesStart+4, verticesStart+5, verticesStart+6 ));
            geometry.faces.push(new Three.Face3( verticesStart+5, verticesStart+7, verticesStart+6 ));
        };

        HandModelClass.prototype.update = function(hand, frame) {

            this._lastFrame = frame;
            for(var i=0; i<FINGER_NAMES.length; i++) {
                this._updateVerticesForFinger(FINGER_NAMES[i], hand[FINGER_NAMES[i]]);
            }
            this._handGeometry.computeFaceNormals();
            this._handGeometry.normalsNeedUpdate = true;
            this._handGeometry.verticesNeedUpdate = true;
        };

        HandModelClass.prototype._updateVerticesForFinger = function(fingerName, fingerInfo) {
            var verticesStart = this[fingerName].verticesStart;
            for(var i=1; i<4; i++) { //Bones in the finger, just take the last 3 into account
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 0], fingerInfo.positions[1], true);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 1], fingerInfo.positions[1], false);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 2], fingerInfo.positions[2], true);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 3], fingerInfo.positions[2], false);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 4], fingerInfo.positions[3], true);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 5], fingerInfo.positions[3], false);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 6], fingerInfo.positions[4], true);
                this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 7], fingerInfo.positions[4], false);
            }
        };

        HandModelClass.prototype._updateFingerVertice = function(vertice, jointCoord, left) {
            //TODO: use angle
            var xThickness = FINGER_THICKNESS; //TODO: param
            if(left) {
                xThickness = -xThickness;
            }
            var relativePositions = Leapmotion.getRelativePositionXYZ([jointCoord[0] + xThickness, jointCoord[1], jointCoord[2]], this._lastFrame);
            var pixelPosition = SpaceConverter.getConvertedPosition(relativePositions);

            vertice.x = pixelPosition.x;
            vertice.y = pixelPosition.y;
            vertice.z = pixelPosition.z;
        };

        return HandModelClass;
    });