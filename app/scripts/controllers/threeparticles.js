'use strict';

angular.module('chesireApp')

.controller('ThreeparticlesCtrl', function ($scope, $timeout, Three, Leapmotion, Colorpalette) {

    var interactionBox = {
        width: 221,
        height: 221,
        depth: 154
    };

    var xMin = -(interactionBox.width/2);
    var xMax = (interactionBox.width/2);
    var yMin = 0;
    var yMax = interactionBox.height;
    var zMin = -(interactionBox.depth/2);
    var zMax = (interactionBox.depth/2);
    var particlesX = interactionBox.width/2;
    var particlesY = interactionBox.height/2;

    var NOTES_WIDTH = 10;
    var PARTICLE_SIZE = 9;

    var pointerElement;
    var particles = null;

    var createParticles = function() {

        particles = particles = new Three.Geometry();
        var pMaterial = new Three.ParticleBasicMaterial({
          size: PARTICLE_SIZE,
          sizeAttenuation: false,
          vertexColors: true
        });

        var i,j, particle, x, y, z;
        // z = (zMax - zMin)/2;
        z = 0;
        var deltaX = (xMax-xMin)/particlesX;
        var deltaY = (yMax-yMin)/particlesY;


        for(i=0; i<particlesX; i++) {
            for(j=0; j<particlesY; j++) {
                x = i*deltaX + xMin;
                y = j*deltaY + yMin;
                particle = new Three.Vector3(x,y,z);
                particles.vertices.push(particle);
                if($scope.isParticleInKey(x)) {
                    particles.colors.push(new Three.Color(Colorpalette.hex.PARTICLES_NOTE));
                } else {
                    particles.colors.push(new Three.Color(Colorpalette.hex.PARTICLES));
                }
                
            }
        }
        // create the particle system
        var particleSystem = new Three.ParticleSystem(
            particles,
            pMaterial);

        // add it to the scene
        $scope.scene.add(particleSystem);
    };

    var createPointer = function() {
        var pointerGeometry = new Three.CircleGeometry(2, 20);
        
        var pointerMaterial = new Three.MeshBasicMaterial({
            color: Colorpalette.hex.POINTER,
            side:Three.DoubleSide
        });

        pointerElement = new Three.Mesh(pointerGeometry, pointerMaterial);
        pointerElement.position.set(-1.5, 0.0, 4.0);
        $scope.scene.add(pointerElement);
    };

    var createScene = function(element) {

        element.addClass('chesirecanvas');
        var height = element[0].offsetHeight,
            width = element[0].offsetWidth;

        $scope.scene = new Three.Scene();
        createPointer();

        //Camera...
        $scope.camera = new Three.PerspectiveCamera( 45, width / height, 0.1, 1000 );
        $scope.camera.position.x = 0;
        $scope.camera.position.z = 350;
        $scope.camera.position.y = interactionBox.height/2;
        $scope.camera.lookAt(new Three.Vector3(0, interactionBox.height/2,0));
        //Lights...
        $scope.pointLight = new Three.PointLight(0xffffff);
        $scope.pointLight.position.set(10, 50, 130);
        $scope.scene.add($scope.pointLight);
        //Action!
        $scope.renderer = new Three.WebGLRenderer();
        $scope.renderer.setClearColor( Colorpalette.hex.BACKGROUND, 1);
        $scope.renderer.setSize( width, height );
        element.append($scope.renderer.domElement);
    };

    var updatePointer = function(pixelPosition) {

        pointerElement.position.set(pixelPosition.x, pixelPosition.y, 1);
    };

    // var updateParticles = function(pixelPosition) {

    //     var particle;
    //     var position = new Three.Vector2(pixelPosition.x, pixelPosition.y);

    //     for(var i=0; i<particles.vertices.length; i++) {

    //         particle = particles.vertices[i];
    //         if(position.distanceTo(particle)<20) {
    //             particles.colors[i] = new Three.Color(Colorpalette.hex.PARTICLES);
    //         } else {
    //             particles.colors[i] = new Three.Color(Colorpalette.hex.PARTICLES_NOTE);
    //         }
    //     }
    //     // particles.verticesNeedUpdate = true;
    //     particles.colorsNeedUpdate = true;
    // };

    $scope.isParticleInKey = function(x) {

        for(var i=0; i<$scope.keyRanges.length; i++) {
            if( (x >= $scope.keyRanges[i].start) && (x < $scope.keyRanges[i].end)) {
                return true;
            }
        }
        return false;
    };

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            $scope.$watch('chesirescale', $scope.scaleChanged);
            $scope.renderer.render($scope.scene, $scope.camera);
        });
    };

    $scope.createKeyRanges = function() {

        $scope.keyRanges = [];
        var notes = $scope.chesirescale.currentScale.notes;
        for(var i=0; i<notes.length; i++) {
            $scope.keyRanges.push({
                start: (interactionBox.width/(notes.length-1))*(i) - (NOTES_WIDTH/2) + xMin,
                end: (interactionBox.width/(notes.length-1))*(i) + (NOTES_WIDTH/2) + xMin
            });
        }
    };

    $scope.scaleChanged = function(newScale) {

        if(newScale) {

            $scope.createKeyRanges();
            //TODO
            // $scope.removeParticles();
            createParticles();
        }
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = $scope.getScenePosition(relativePositions);

                updatePointer(pixelPosition);
                // updateParticles(pixelPosition);
            }
            $scope.renderer.render($scope.scene, $scope.camera);
        }
    };

    $scope.getScenePosition = function(position) {
        return {
            x: position.x * (xMax - xMin) + xMin,
            y: (position.y * (yMax - yMin) + yMin),
            z: (position.z * (zMax - zMin) + zMin)
        };
    };
});
