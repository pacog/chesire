'use strict';

angular.module('chesireApp')

.controller('ThreeparticlesCtrl', function ($scope, $timeout, $q, Three, Leapmotion, Colorpalette, ScaleOptions, CurrentSynth, SpaceConverter, HandModel, BoundariesModel, PointerModel) {

    var interactionBox = {
        width: 221,
        // height: 221,
        height: 221,
        depth: 154
    };

    var xMin = -(interactionBox.width/2);
    var xMax = (interactionBox.width/2);
    var zMin = -(interactionBox.depth/2);
    var zMax = (interactionBox.depth/2);
    var particlesX = interactionBox.width;
    // var particlesY = interactionBox.height/8;
    var particlesZ = interactionBox.depth;
    var currentSynth = null;
    var oscillator = null;
    var mainNote = null;
    var mainGain = null;
    var POINTER_RADIUS = 50;
    var Y_REDUCTION = 0.05;

    var CHORDS_WIDTH = 10;

    var currentMesh = null;
    var meshGeometry = null;

    var whenSceneIsReady = $q.defer();

    var handModel = null;
    var boundariesModel = null;
    var pointerModel = null;

    $scope.init = function(element) {
        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged); //TODO: use leap onFrame
            $scope.renderer.render($scope.scene, $scope.camera);
            whenSceneIsReady.resolve(true);
        });
        ScaleOptions.subscribeToChangesInScaleOptions(scaleChanged);

        currentSynth = CurrentSynth.getCurrentSynth();

        $scope.$watch(function() {
            return CurrentSynth.getCurrentSynth();
        }, synthChanged);

        $scope.$watchCollection(function() {
            if(oscillator && oscillator.oscillatorCollection) {
                return oscillator.oscillatorCollection.getNodes();
            }
            return false;
        }, synthNodesChanged);
    };

    var synthChanged = function() {
        currentSynth = CurrentSynth.getCurrentSynth();
        synthNodesChanged();
    };

    var synthNodesChanged = function() {
        oscillator = false;
        if(currentSynth && currentSynth.synthElements) {
            oscillator = currentSynth.synthElements[0];
            mainNote = oscillator.oscillatorCollection.getNodes()[0];
            mainGain = oscillator.gainController;
        }
    };

    var scaleChanged = function(newScale) {
        if(newScale) {
            whenSceneIsReady.promise.then(function () {
                $scope.createKeyRanges(newScale);
                // createParticles();
                createMesh();
            });
        }
    };


    var createMesh = function() {
        meshGeometry = new Three.Geometry();
        meshGeometry.dynamic = true;
        var deltaX = (xMax-xMin)/particlesX;
        // var deltaY = (yMax-yMin)/particlesY;
        var deltaZ = (zMax-zMin)/particlesZ;

        var material = new Three.MeshLambertMaterial({
            color: Colorpalette.hex.PARTICLES,
            // shading: Three.FlatShading,
            vertexColors: Three.FaceColors
        });
        var i,j, x, y, z, xNext, zNext;
        var verticeIndex = 0;

        for(i=0; i<particlesX; i++) {
            for(j=0; j<particlesZ; j++) {
                x = i*deltaX + xMin;
                y = 0 + randomNoise();
                z = j*deltaZ + zMin;
                xNext = (i+1)*deltaX + xMin;
                zNext = (j+1)*deltaZ + zMin;

                meshGeometry.vertices.push( new Three.Vector3(x, y, z ) );
                meshGeometry.vertices.push( new Three.Vector3( x, y, zNext ) );
                meshGeometry.vertices.push( new Three.Vector3(  xNext, y, z ) );
                meshGeometry.vertices.push( new Three.Vector3(  xNext, y, zNext ) );

                var face1 = new Three.Face3( verticeIndex+1, verticeIndex+2, verticeIndex );
                var face2 = new Three.Face3( verticeIndex+1, verticeIndex+3, verticeIndex+2 );
                //faces in the back
                var face3 = new Three.Face3( verticeIndex, verticeIndex+2, verticeIndex+1 );
                var face4 = new Three.Face3( verticeIndex+2, verticeIndex+3, verticeIndex+1 );

                if($scope.isParticleInKey(x)) {
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

                meshGeometry.faces.push( face1 );
                meshGeometry.faces.push( face2 );
                meshGeometry.faces.push( face3 );
                meshGeometry.faces.push( face4 );
                verticeIndex += 4;
            }
        }
        if(currentMesh) {
            $scope.scene.remove(currentMesh);
            currentMesh = null;
        }
        meshGeometry.computeFaceNormals();
        currentMesh = new Three.Mesh(meshGeometry, material);
        $scope.scene.add(currentMesh);
    };

    var createScene = function(element) {

        element.addClass('chesirecanvas');
        var height = element[0].offsetHeight,
            width = element[0].offsetWidth;

        $scope.scene = new Three.Scene();
        pointerModel = new PointerModel($scope.scene);
        handModel = new HandModel($scope.scene);
        boundariesModel = new BoundariesModel($scope.scene);

        //Camera...
        $scope.camera = new Three.PerspectiveCamera( 45, width / height, 0.1, 1000 );
        $scope.camera.position.x = 0;
        $scope.camera.position.z = 220;
        $scope.camera.position.y = 100;
        $scope.camera.lookAt(new Three.Vector3(0, 30,0));
        //Lights...
        $scope.pointLight = new Three.PointLight(0xffffff);
        $scope.pointLight.position.set(10, 150, 130);
        $scope.scene.add($scope.pointLight);
        //Action!
        $scope.renderer = new Three.WebGLRenderer();
        $scope.renderer.setClearColor( Colorpalette.hex.BACKGROUND, 1);
        $scope.renderer.setSize( width, height );
        element.append($scope.renderer.domElement);
    };

    var getYToApplyFromTwoPoints = function(pointer, otherPoint, avoidOscillator) {
        var random = randomNoise(pointer.y/interactionBox.height);
        var distance = Math.sqrt((pointer.x - otherPoint.x)*(pointer.x - otherPoint.x) + (pointer.z - otherPoint.z)*(pointer.z - otherPoint.z));

        var result = random;

        if(distance<POINTER_RADIUS) {
            var distanceFactor = (POINTER_RADIUS-distance)/20*(POINTER_RADIUS-distance)/20;
            result = distanceFactor*(pointer.y)*Y_REDUCTION + random;
        }
        
        if(!avoidOscillator) {
            result += getOscillatorYForDistance(distance);
        }

        return result;
    };

    var getOscillatorYForDistance = function(distance) {
        var distanceFactor = 0;
        if(POINTER_RADIUS > distance) {
            distanceFactor = (POINTER_RADIUS - distance)/POINTER_RADIUS;
        }
        var freqFactor = mainNote.oscillator.frequency.value*distance/700;
        return distanceFactor*Math.sin(freqFactor)*10*mainGain.gain.value;
    };

    var randomNoise = function(factor) {
        factor = factor || 0;
        return Math.random()*factor*0;
    };

    var updateParticles = function(pixelPosition) {
        for(var i = meshGeometry.vertices.length -1; i>=0; i--) {
            meshGeometry.vertices[i].y = getYToApplyFromTwoPoints(pixelPosition, meshGeometry.vertices[i]);
        }
        meshGeometry.verticesNeedUpdate = true;
    };


    $scope.isParticleInKey = function(x) {

        for(var i=0; i<$scope.keyRanges.length; i++) {
            if( (x >= $scope.keyRanges[i].start) && (x < $scope.keyRanges[i].end)) {
                return true;
            }
        }
        return false;
    };

    $scope.createKeyRanges = function(newScale) {
        $scope.keyRanges = [];
        var chords = newScale.chords;
        for(var i=0; i<chords.length; i++) {
            $scope.keyRanges.push({
                start: (interactionBox.width/(chords.length-1))*(i) - (CHORDS_WIDTH/2) + xMin,
                end: (interactionBox.width/(chords.length-1))*(i) + (CHORDS_WIDTH/2) + xMin
            });
        }
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = SpaceConverter.getConvertedPosition(relativePositions);
                handModel.update(frame.hands[0]);
                pointerModel.update(pixelPosition);
                updateParticles(pixelPosition);
            } else {
                //TODO: remove hand and put everything at rest
            }
            $scope.renderer.render($scope.scene, $scope.camera);
        }
    };
});
