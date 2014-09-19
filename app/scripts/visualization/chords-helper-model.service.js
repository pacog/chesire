'use strict';

angular.module('chesireApp')
    .factory('ChordsHelperModel', function(Three, Colorpalette, SpaceConverter, VisualizationKeyHelper) {

        var MIN_OPACITY = 0.05;
        var MAX_OPACITY = 0.3;

        var ChordsHelperModelClass = function(scene) {
            this._scene = scene;
            this._sceneDimensions = SpaceConverter.getBoxLimits();
            this._createChordsHelper();
        };

        ChordsHelperModelClass.prototype.update = function(x) {
            var chordsVolumeInfo = VisualizationKeyHelper.getKeyRangesVolume(x);
            for(var i=0; i<chordsVolumeInfo.length; i++) {
                this._updateChordWithVolume(i, chordsVolumeInfo[i]);
            }
        };

        ChordsHelperModelClass.prototype._updateChordWithVolume = function(chordIndex, volume) {
            var newOpacity = MIN_OPACITY + (MAX_OPACITY-MIN_OPACITY)*volume;
            this._chordsMesh[chordIndex].material.opacity = newOpacity;
        };

        ChordsHelperModelClass.prototype._createChordsHelper = function() {
            this._createChordsGeometry();
            this._createMesh();
        };

        ChordsHelperModelClass.prototype.destroy = function() {
            if(this._chordsMesh) {
                for(var i=0; i<this._chordsMesh.length; i++) {
                    this._scene.remove(this._chordsMesh[i]);
                }
                this._chordsMesh = [];
            }
        };

        ChordsHelperModelClass.prototype._createMesh = function() {
            this._chordsMesh = [];
            for(var i=0; i<this._chordsMeshGeometry.length; i++) {
                this._chordsMeshGeometry[i].computeFaceNormals();
                this._chordsMesh.push(new Three.Mesh(this._chordsMeshGeometry[i], this._getMaterial()));
                this._scene.add(this._chordsMesh[i]);
            }
        };

        ChordsHelperModelClass.prototype._getMaterial = function() {
            return new Three.MeshLambertMaterial({
                color: Colorpalette.hex.PARTICLES_NOTE,
                transparent: true,
                opacity: MIN_OPACITY
            });
        };

        ChordsHelperModelClass.prototype._createChordsGeometry = function() {
            this._chordsMeshGeometry = [];
            var chords = VisualizationKeyHelper.getKeyRanges();
            for(var i=0; i<chords.length; i++) {
                this._chordsMeshGeometry[i] = this._createGeometryForChord(chords[i]);
            }
        };

        ChordsHelperModelClass.prototype._createGeometryForChord = function(chord) {
            var geometry = new Three.Geometry();

            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMax, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            geometry.vertices.push( new Three.Vector3(chord.start, this._sceneDimensions.yMax, this._sceneDimensions.zMax ) );

            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMin, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMax, this._sceneDimensions.zMin ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMin, this._sceneDimensions.zMax ) );
            geometry.vertices.push( new Three.Vector3(chord.end, this._sceneDimensions.yMax, this._sceneDimensions.zMax ) );

            geometry.faces.push(new Three.Face3( 1, 2, 0 ));
            geometry.faces.push(new Three.Face3( 1, 3, 2 ));
            geometry.faces.push(new Three.Face3( 0, 2, 1 ));
            geometry.faces.push(new Three.Face3( 1, 2, 3 ));

            geometry.faces.push(new Three.Face3( 5, 6, 4 ));
            geometry.faces.push(new Three.Face3( 5, 7, 6 ));
            geometry.faces.push(new Three.Face3( 4, 6, 5 ));
            geometry.faces.push(new Three.Face3( 5, 6, 7 ));

            geometry.faces.push(new Three.Face3( 2, 3, 6 ));
            geometry.faces.push(new Three.Face3( 2, 6, 3 ));
            geometry.faces.push(new Three.Face3( 3, 7, 6 ));
            geometry.faces.push(new Three.Face3( 3, 6, 7 ));

            return geometry;
        };

        return ChordsHelperModelClass;
    });
