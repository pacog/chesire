'use strict';

angular.module('chesireApp')
    .factory('ChordsHelperModel', function(Three, Colorpalette, SpaceConverter, VisualizationKeyHelper) {

        var ChordsHelperModelClass = function(scene) {
            this._scene = scene;
            this._sceneDimensions = SpaceConverter.getBoxLimits();
            this._createChordsHelper();
        };

        ChordsHelperModelClass.prototype._createChordsHelper = function() {
            var material = new Three.MeshLambertMaterial({
                color: Colorpalette.hex.PARTICLES_NOTE,
                transparent: true,
                opacity: 0.25
            });

            this._chordsMeshGeometry = this._createChordsGeometry();

            if(this._chordsMesh) {
                this._scene.remove(this._chordsMesh);
                this._chordsMesh = null;
            }

            this._chordsMeshGeometry.computeFaceNormals();
            this._chordsMesh = new Three.Mesh(this._chordsMeshGeometry, material);
            this._scene.add(this._chordsMesh);
        };

        ChordsHelperModelClass.prototype._createChordsGeometry = function() {
            var chordsMeshGeometry = new Three.Geometry();
            var chords = VisualizationKeyHelper.getKeyRanges();
            this._verticeIndex = 0;
            for(var i=0; i<chords.length; i++) {
                this._createGeometryForChord(chordsMeshGeometry, chords[i]);
            }
            return chordsMeshGeometry;
        };

        ChordsHelperModelClass.prototype._createGeometryForChord = function(geometry, chord) {

            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMax, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMax, this._sceneDimensions.zMax ) );

            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMax, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMax, this._sceneDimensions.zMax ) );

            geometry.faces.push(new Three.Face3( this._verticeIndex+1, this._verticeIndex+2, this._verticeIndex ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+1, this._verticeIndex+3, this._verticeIndex+2 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex, this._verticeIndex+2, this._verticeIndex+1 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+1, this._verticeIndex+2, this._verticeIndex+3 ));

            geometry.faces.push(new Three.Face3( this._verticeIndex+5, this._verticeIndex+6, this._verticeIndex+4 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+5, this._verticeIndex+7, this._verticeIndex+6 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+4, this._verticeIndex+6, this._verticeIndex+5 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+5, this._verticeIndex+6, this._verticeIndex+7 ));

            geometry.faces.push(new Three.Face3( this._verticeIndex+2, this._verticeIndex+3, this._verticeIndex+6 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+2, this._verticeIndex+6, this._verticeIndex+3 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+3, this._verticeIndex+7, this._verticeIndex+6 ));
            geometry.faces.push(new Three.Face3( this._verticeIndex+3, this._verticeIndex+6, this._verticeIndex+7 ));

            this._verticeIndex += 8;
        };

        return ChordsHelperModelClass;
    });
