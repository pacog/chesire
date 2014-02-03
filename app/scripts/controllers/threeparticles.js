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

    var triangleMesh;

    var createParticles = function() {
        // create the particle variables
        var particleCount = 1800,
            particles = new Three.Geometry(),
            pMaterial = new Three.ParticleBasicMaterial({
              color: Colorpalette.hex.PARTICLES,
              size: 20
            });

        // now create the individual particles
        for (var p = 0; p < particleCount; p++) {

          var pX = Math.random() * (xMax - xMin) + xMin,
              pY = Math.random() * (yMax - yMin) + yMin,
              pZ = Math.random() * (zMax - zMin) + zMin,
              particle = new Three.Vertex(
                new Three.Vector3(pX, pY, pZ)
              );

          // add it to the geometry
          particles.vertices.push(particle);
        }

        // create the particle system
        var particleSystem = new Three.ParticleSystem(
            particles,
            pMaterial);

        // add it to the scene
        $scope.scene.add(particleSystem);
    };

    var createPointer = function() {
         var triangleGeometry = new Three.Geometry();

        triangleGeometry.vertices.push( new Three.Vector3( -10,  10, 0 ) );
        triangleGeometry.vertices.push( new Three.Vector3( -10, -10, 0 ) );
        triangleGeometry.vertices.push( new Three.Vector3(  10, -10, 0 ) );

        triangleGeometry.faces.push( new Three.Face3( 0, 1, 2 ) );

        triangleGeometry.computeBoundingSphere();
        var triangleMaterial = new Three.MeshBasicMaterial({
            color: Colorpalette.hex.POINTER,
            side:Three.DoubleSide
        });

        // Create a mesh and insert the geometry and the material. Translate the whole mesh
        // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
        triangleMesh = new Three.Mesh(triangleGeometry, triangleMaterial);
        triangleMesh.position.set(-1.5, 0.0, 4.0);
        $scope.scene.add(triangleMesh);
    };

    var createScene = function(element) {

        element.addClass('chesirecanvas');
        var height = element[0].offsetHeight,
            width = element[0].offsetWidth;

        $scope.scene = new Three.Scene();
        createParticles();
        createPointer();

        //Camera...
        $scope.camera = new Three.PerspectiveCamera( 45, width / height, 0.1, 1000 );
        $scope.camera.position.x = 0;
        $scope.camera.position.z = 350;
        $scope.camera.position.y = 0;
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

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            $scope.renderer.render($scope.scene, $scope.camera);
        });
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = $scope.getScenePosition(relativePositions);

                triangleMesh.position.set(pixelPosition.x, pixelPosition.y, pixelPosition.z);
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
