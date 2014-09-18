'use strict';

angular.module('chesireApp')
    .factory('HandModel', function(Three, Colorpalette, SpaceConverter, Leapmotion) {
        var HAND_DEFAULT_OPACITY = 0.2;
        var FINGER_NAMES = ['pinky', 'indexFinger', 'ringFinger', 'middleFinger'];
        var VERTICES_PER_FINGER = 8;
        var VERTICES_PER_THUMB = 6;
        var VERTICES_PER_HAND = 5;
        var FINGER_THICKNESS = 5;
        var THUMB_THICKNESS = 8;
        var verticesAlreadyAdded;

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
            verticesAlreadyAdded = 0;
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
            this._createThumb(geometry);
            this._createPalm(geometry);
            geometry.computeFaceNormals();
            return geometry;
        };

        HandModelClass.prototype._createThumb = function(geometry) {
            for(var j=0; j<VERTICES_PER_THUMB; j++) {
                geometry.vertices.push( new Three.Vector3(1, 1, 1 ) );
            }
            this.thumb = {
                verticesStart: verticesAlreadyAdded
            };
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+2, verticesAlreadyAdded+1 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+1, verticesAlreadyAdded+2, verticesAlreadyAdded+3 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+2, verticesAlreadyAdded+4, verticesAlreadyAdded+3 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+3, verticesAlreadyAdded+4, verticesAlreadyAdded+5 ));
            //Reverse sides:
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+1, verticesAlreadyAdded+2 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+1, verticesAlreadyAdded+3, verticesAlreadyAdded+2 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+2, verticesAlreadyAdded+3, verticesAlreadyAdded+4 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+3, verticesAlreadyAdded+5, verticesAlreadyAdded+4 ));

            verticesAlreadyAdded += VERTICES_PER_THUMB;
        };

        HandModelClass.prototype._createPalm = function(geometry) {
            for(var j=0; j<VERTICES_PER_HAND; j++) {
                geometry.vertices.push( new Three.Vector3(1, 1, 1 ) );
            }
            this.palm = {
                verticesStart: verticesAlreadyAdded
            };
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+1, verticesAlreadyAdded+3 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+2, verticesAlreadyAdded+3 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+2, verticesAlreadyAdded+4, verticesAlreadyAdded+3 ));
            //Reverse sides:
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+3, verticesAlreadyAdded+1 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+0, verticesAlreadyAdded+3, verticesAlreadyAdded+2 ));
            geometry.faces.push(new Three.Face3( verticesAlreadyAdded+2, verticesAlreadyAdded+3, verticesAlreadyAdded+4 ));

            verticesAlreadyAdded += VERTICES_PER_HAND;
        };

        HandModelClass.prototype._createFacesForFinger = function(geometry, verticesStart) {
            geometry.faces.push(new Three.Face3( verticesStart+0, verticesStart+2, verticesStart+1 ));
            geometry.faces.push(new Three.Face3( verticesStart+1, verticesStart+2, verticesStart+3 ));
            geometry.faces.push(new Three.Face3( verticesStart+2, verticesStart+4, verticesStart+3 ));
            geometry.faces.push(new Three.Face3( verticesStart+3, verticesStart+4, verticesStart+5 ));
            geometry.faces.push(new Three.Face3( verticesStart+4, verticesStart+6, verticesStart+5 ));
            geometry.faces.push(new Three.Face3( verticesStart+5, verticesStart+6, verticesStart+7 ));
            //Reverse sides:
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
            this._updateVerticesForThumb(hand.thumb);
            this._updateVerticesForPalm(hand);
            this._handGeometry.computeFaceNormals();
            this._handGeometry.normalsNeedUpdate = true;
            this._handGeometry.verticesNeedUpdate = true;
        };

        HandModelClass.prototype._updateVerticesForFinger = function(fingerName, fingerInfo) {
            var verticesStart = this[fingerName].verticesStart;

            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 0], fingerInfo.positions[1], true);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 1], fingerInfo.positions[1], false);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 2], fingerInfo.positions[2], true);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 3], fingerInfo.positions[2], false);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 4], fingerInfo.positions[3], true);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 5], fingerInfo.positions[3], false);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 6], fingerInfo.positions[4], true);
            this._updateFingerVertice(this._handGeometry.vertices[verticesStart + 7], fingerInfo.positions[4], false);
        };

        HandModelClass.prototype._updateVerticesForThumb = function(fingerInfo) {
            var verticesStart = this.thumb.verticesStart;

            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 0], fingerInfo.positions[2], true);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 1], fingerInfo.positions[2], false);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 2], fingerInfo.positions[3], true);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 3], fingerInfo.positions[3], false);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 4], fingerInfo.positions[4], true);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 5], fingerInfo.positions[4], false);
        };

        HandModelClass.prototype._updateVerticesForPalm = function(handInfo) {
            var verticesStart = this.palm.verticesStart;
            this._updatePalmVertice(this._handGeometry.vertices[verticesStart + 0], handInfo.pinky.bones[0].prevJoint);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 1], handInfo.pinky.bones[0].nextJoint);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 2], handInfo.indexFinger.bones[0].prevJoint);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 3], handInfo.indexFinger.bones[0].nextJoint);
            this._updateThumbVertice(this._handGeometry.vertices[verticesStart + 4], handInfo.thumb.bones[2].prevJoint);
        };

        HandModelClass.prototype._updatePalmVertice = function(vertice, jointCoord) {
            this._updateVertice(vertice, jointCoord);
        };

        HandModelClass.prototype._updateFingerVertice = function(vertice, jointCoord, left) {
            //TODO: use angle
            var xThickness = FINGER_THICKNESS;
            if(left) {
                xThickness = -xThickness;
            }
            this._updateVertice(vertice, [jointCoord[0] + xThickness, jointCoord[1], jointCoord[2]]);
        };

        HandModelClass.prototype._updateThumbVertice = function(vertice, jointCoord, left) {
            //TODO: use angle
            var xThickness = THUMB_THICKNESS;
            if(left) {
                xThickness = -xThickness;
            }
            this._updateVertice(vertice, [jointCoord[0] + xThickness, jointCoord[1], jointCoord[2]]);
        };

        HandModelClass.prototype._updateVertice = function(vertice, position) {
            var relativePositions = Leapmotion.getRelativePositionXYZ(position, this._lastFrame);
            var pixelPosition = SpaceConverter.getConvertedPosition(relativePositions);

            vertice.x = pixelPosition.x;
            vertice.y = pixelPosition.y;
            vertice.z = pixelPosition.z;
        };

        return HandModelClass;
    });