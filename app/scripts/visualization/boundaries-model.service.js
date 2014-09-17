'use strict';

angular.module('chesireApp')
    .factory('BoundariesModel', function(Three, Colorpalette, SpaceConverter) {

        var BoundariesModelClass = function(scene) {
            this._scene = scene;
            this._sceneDimensions = SpaceConverter.getBoxLimits();
            this._createBoundaries();
        };

        BoundariesModelClass.prototype._createBoundaries = function() {

            var boundariesMeshGeometry = new Three.Geometry();

            var material = new Three.MeshLambertMaterial({
                color: Colorpalette.hex.BOUNDARIES,
                transparent: true,
                opacity: 0.25
            });

            var yMaxAlt = this._sceneDimensions.yMax/3;

            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMin, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMin, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMin, yMaxAlt, this._sceneDimensions.zMin ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMin, yMaxAlt, this._sceneDimensions.zMax ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMax, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMax, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMax, yMaxAlt, this._sceneDimensions.zMin ) );
            boundariesMeshGeometry.vertices.push( new Three.Vector3(this._sceneDimensions.xMax, yMaxAlt, this._sceneDimensions.zMax ) );

            var face1 = new Three.Face3( 0, 2, 1 );
            var face2 = new Three.Face3( 1, 2, 3 );
            var face3 = new Three.Face3( 0, 4, 2 );
            var face4 = new Three.Face3( 2, 4, 6 );
            var face5 = new Three.Face3( 7, 6, 4 );
            var face6 = new Three.Face3( 7, 4, 5 );
            var face7 = new Three.Face3( 2, 3, 6 );
            var face8 = new Three.Face3( 3, 7, 6 );

            boundariesMeshGeometry.faces.push(face1);
            boundariesMeshGeometry.faces.push(face2);
            boundariesMeshGeometry.faces.push(face3);
            boundariesMeshGeometry.faces.push(face4);
            boundariesMeshGeometry.faces.push(face5);
            boundariesMeshGeometry.faces.push(face6);
            boundariesMeshGeometry.faces.push(face7);
            boundariesMeshGeometry.faces.push(face8);

            boundariesMeshGeometry.computeFaceNormals();
            var boundariesMesh = new Three.Mesh(boundariesMeshGeometry, material);
            this._scene.add(boundariesMesh);
        };

        return BoundariesModelClass;
    });
