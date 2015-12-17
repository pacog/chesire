'use strict';

angular.module('chesireApp')
    .factory('BoundariesModel', function(Three, Colorpalette, SpaceConverter, playerBoundaries) {

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
                opacity: 0.15
            });

            var yMaxAlt = this._sceneDimensions.yMax;

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

            // Top (both sides)
            var face7 = new Three.Face3( 2, 3, 6 );
            var face8 = new Three.Face3( 3, 7, 6 );
            var face9 = new Three.Face3( 2, 6, 3 );
            var face10 = new Three.Face3( 3, 6, 7 );
            var face11 = new Three.Face3( 0, 1, 4 );
            var face12 = new Three.Face3( 0, 4, 1 );
            var face13 = new Three.Face3( 4, 1, 5 );
            var face14 = new Three.Face3( 4, 5, 1 );


            boundariesMeshGeometry.faces.push(face1);
            boundariesMeshGeometry.faces.push(face2);
            boundariesMeshGeometry.faces.push(face3);
            boundariesMeshGeometry.faces.push(face4);
            boundariesMeshGeometry.faces.push(face5);
            boundariesMeshGeometry.faces.push(face6);
            boundariesMeshGeometry.faces.push(face7);
            boundariesMeshGeometry.faces.push(face8);
            boundariesMeshGeometry.faces.push(face9);
            boundariesMeshGeometry.faces.push(face10);
            boundariesMeshGeometry.faces.push(face11);
            boundariesMeshGeometry.faces.push(face12);
            boundariesMeshGeometry.faces.push(face13);
            boundariesMeshGeometry.faces.push(face14);

            boundariesMeshGeometry.computeFaceNormals();
            var boundariesMesh = new Three.Mesh(boundariesMeshGeometry, material);
            this._scene.add(boundariesMesh);
            playerBoundaries.setBoundariesObject(boundariesMesh);
        };

        return BoundariesModelClass;
    });
