'use strict';

angular.module('chesireApp')

.controller('PixicanvasCtrl', function ($scope, $timeout, Leapmotion, Pixi, requestanimationframe, Colorpalette) {

    var PARTICLE_SIZE = 10;
    var PARTICLE_BORDER = 0;
    var PARTICLE_GAP = 2;

    var pointer = null;
    var particles = null;
    var stage = null;
    var renderer = null;

    var createScene = function(element) {

        stage = new Pixi.Stage(Colorpalette.hex.BACKGROUND);
        $scope.windowWidth = element[0].clientWidth;
        $scope.windowHeight = element[0].clientHeight;
        renderer = Pixi.autoDetectRenderer($scope.windowWidth, $scope.windowHeight, null, false, true);
        element[0].appendChild(renderer.view);
        createParticles(stage);
        createPointer(stage);
    };

    var createPointer = function(myStage) {
        pointer = new Pixi.Graphics();
        pointer.lineStyle ( 2 , Colorpalette.hex.POINTER,  1);
        pointer.beginFill(Colorpalette.hex.POINTER);
        pointer.drawCircle(0, 0, 15);
        myStage.addChild(pointer);
    };

    var createParticles = function(myStage) {
        var particleColumns = Math.round($scope.windowWidth/(PARTICLE_SIZE + PARTICLE_GAP + 2*PARTICLE_BORDER));
        var particleRows = Math.round($scope.windowHeight/(PARTICLE_SIZE + PARTICLE_GAP + 2*PARTICLE_BORDER));
        var x, y, particle;

        //TODO: destroy this if it already existed
        particles = [];

        for(var i=0; i<particleColumns; i++) {
            particles[i] = [];
            for(var j=0; j<particleRows; j++) {
                x = i * (PARTICLE_SIZE + PARTICLE_GAP + 2*PARTICLE_BORDER);
                y = j * (PARTICLE_SIZE + PARTICLE_GAP + 2*PARTICLE_BORDER);
                particle = new Pixi.Graphics();
                particle.lineStyle ( PARTICLE_BORDER , Colorpalette.hex.PARTICLES,  1);
                particle.beginFill(Colorpalette.hex.PARTICLES);
                // particle.drawCircle(x, y, PARTICLE_SIZE/2);
                particle.drawRect(0, 0, PARTICLE_SIZE, PARTICLE_SIZE);
                particle.position.x = x;
                particle.position.y = y;
                myStage.addChild(particle);
                particles[i][j] = {
                    particle: particle,
                    x: x,
                    y: y,
                    row: j,
                    column: i
                };
            }
        }
    };

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            requestanimationframe( $scope.eachFrame );
        });
    };

    var lastLoop = new Date();

    $scope.eachFrame = function() {
        var thisLoop = new Date();
        $scope.$apply(function() {
            $scope.fps = 1000 / (thisLoop - lastLoop);
            lastLoop = thisLoop;
        });
        renderer.render(stage);
        requestanimationframe( $scope.eachFrame );
    };

    //TODO: this should be from another directive
    $scope.getPixelsPosition = function(relativePosition) {
        return {
            x: relativePosition.x * $scope.windowWidth,
            y: $scope.windowHeight - (relativePosition.y * $scope.windowHeight)
        };
    };

    $scope.frameInfoChanged = function() {
        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = $scope.getPixelsPosition(relativePositions);
                $scope.updatePointerPosition(pixelPosition);
                //$scope.updateParticles(pixelPosition);
            } else {
                $scope.updatePointerPosition(false);
            }
        }
    };

    $scope.updateParticles = function(position) {

        var distance;
        var particle;
        for(var i=0; i<particles.length; i++) {
            for(var j=0; j<particles[i].length; j++) {
                particle = particles[i][j];
                distance = $scope.distance(position, particle);
                if(distance < 40) {
                    particle.particle.scale.x = 0.5;
                    particle.particle.scale.y = 0.5;
                    // particle.particle.position.x = particle.x-10;
                    // particle.particle.position.y = particle.y-10;
                } else {
                    particle.particle.scale.x = 1;
                    particle.particle.scale.y = 1;
                    // particle.particle.position.x = particle.x;
                    // particle.particle.position.y = particle.y;
                }
            }
        }
    };

    $scope.distance = function(pos1, pos2) {

        return Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x) + (pos1.y-pos2.y)*(pos1.y-pos2.y));
    };

    $scope.updatePointerPosition = function(position) {
        if(position) {
            pointer.position.x = position.x;
            pointer.position.y = position.y;
            pointer.alpha = 1;
        } else {
            pointer.alpha = 0;
        }
    };
});
