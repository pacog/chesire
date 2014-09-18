'use strict';

angular.module('chesireApp')
    .service('SoundMeshModel', function(Three, Colorpalette, SpaceConverter, VisualizationKeyHelper) {

        var particlesX = SpaceConverter.getBoxSize().width/2;
        var particlesZ = SpaceConverter.getBoxSize().depth/2;
        var POINTER_RADIUS = 50;
        var Y_REDUCTION = 0.05;

        var SoundMesh = function(scene) {
            this._scene = scene;
            this._sceneDimensions = SpaceConverter.getBoxLimits();
            this._createSoundMesh();
        };

        //TODO: ugly long method, divide it!
        SoundMesh.prototype._createSoundMesh = function() {
            this._soundMeshGeometry = new Three.Geometry();
            this._soundMeshGeometry.dynamic = true;

            var deltaX = (this._sceneDimensions.xMax-this._sceneDimensions.xMin)/particlesX;
            var deltaZ = (this._sceneDimensions.zMax-this._sceneDimensions.zMin)/particlesZ;

            var material = new Three.MeshLambertMaterial({
                color: Colorpalette.hex.PARTICLES,
                // shading: Three.FlatShading,
                vertexColors: Three.FaceColors
            });
            var i,j, x, y, z, xNext, zNext;
            var verticeIndex = 0;

            for(i=0; i<particlesX; i++) {
                for(j=0; j<particlesZ; j++) {
                    x = i*deltaX + this._sceneDimensions.xMin;
                    y = 0;
                    z = j*deltaZ + this._sceneDimensions.zMin;
                    xNext = (i+1)*deltaX + this._sceneDimensions.xMin;
                    zNext = (j+1)*deltaZ + this._sceneDimensions.zMin;

                    this._soundMeshGeometry.vertices.push( new Three.Vector3(x, y, z ) );
                    this._soundMeshGeometry.vertices.push( new Three.Vector3( x, y, zNext ) );
                    this._soundMeshGeometry.vertices.push( new Three.Vector3(  xNext, y, z ) );
                    this._soundMeshGeometry.vertices.push( new Three.Vector3(  xNext, y, zNext ) );

                    var face1 = new Three.Face3( verticeIndex+1, verticeIndex+2, verticeIndex );
                    var face2 = new Three.Face3( verticeIndex+1, verticeIndex+3, verticeIndex+2 );
                    //faces in the back
                    var face3 = new Three.Face3( verticeIndex, verticeIndex+2, verticeIndex+1 );
                    var face4 = new Three.Face3( verticeIndex+2, verticeIndex+3, verticeIndex+1 );

                    if(VisualizationKeyHelper.isParticleInKey(x)) {
                        face1.color.setHex(Colorpalette.hex.PARTICLES_NOTE);
                        face2.color.setHex(Colorpalette.hex.PARTICLES_NOTE);
                    } else {
                        // face1.color.setRGB( Math.random(), Math.random(), Math.random());
                        // face2.color.setRGB( Math.random(), Math.random(), Math.random());
                        face1.color.setHex(Colorpalette.hex.PARTICLES);
                        face2.color.setHex(Colorpalette.hex.PARTICLES);
                    }
                    face3.color.setHex(Colorpalette.hex.PARTICLES_BACK);
                    face4.color.setHex(Colorpalette.hex.PARTICLES_BACK);

                    this._soundMeshGeometry.faces.push( face1 );
                    this._soundMeshGeometry.faces.push( face2 );
                    this._soundMeshGeometry.faces.push( face3 );
                    this._soundMeshGeometry.faces.push( face4 );
                    verticeIndex += 4;
                }
            }
            if(this._currentMesh) {
                this._scene.remove(this._currentMesh);
                this._currentMesh = null;
            }
            this._soundMeshGeometry.computeFaceNormals();
            this._currentMesh = new Three.Mesh(this._soundMeshGeometry, material);
            this._scene.add(this._currentMesh);
        };

        SoundMesh.prototype.update = function(pixelPosition) {
            for(var i = this._soundMeshGeometry.vertices.length -1; i>=0; i--) {
                this._soundMeshGeometry.vertices[i].y = this._getYToApplyFromTwoPoints(pixelPosition, this._soundMeshGeometry.vertices[i]);
            }
            this._soundMeshGeometry.computeFaceNormals();
            this._soundMeshGeometry.normalsNeedUpdate = true;
            this._soundMeshGeometry.verticesNeedUpdate = true;
        };

        SoundMesh.prototype._getYToApplyFromTwoPoints = function(pointer, otherPoint, avoidOscillator) {

            var distance = Math.sqrt((pointer.x - otherPoint.x)*(pointer.x - otherPoint.x) + (pointer.z - otherPoint.z)*(pointer.z - otherPoint.z));

            var result = 0;

            if(distance<POINTER_RADIUS) {
                var distanceFactor = (POINTER_RADIUS-distance)/20*(POINTER_RADIUS-distance)/20;
                result = distanceFactor*(pointer.y)*Y_REDUCTION;
            }
            
            if(!avoidOscillator) {
                result += this._getOscillatorYForDistance(distance);
            }

            return result;
        };

        SoundMesh.prototype._getOscillatorYForDistance = function(distance) {
            var distanceFactor = 0;
            if(POINTER_RADIUS > distance) {
                distanceFactor = (POINTER_RADIUS - distance)/POINTER_RADIUS;
            }
            var freqFactor = VisualizationKeyHelper.getCurrentFrequency()*distance/700;
            return distanceFactor*Math.cos(freqFactor)*10*VisualizationKeyHelper.getCurrentGain();
        };

        return SoundMesh;
    });
