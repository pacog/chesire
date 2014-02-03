'use strict';

angular.module('chesireApp')


.controller('PapercanvasCtrl', function ($scope, $timeout, Paper, $document, Leapmotion, requestanimationframe, Colorpalette) {

    var pointer = false;
    var particles = false;
    var PARTICLES_SIZE = 10;
    var PARTICLES_SEPARATION = 4;
    var POINTER_SIZE = 15;
    var POINTER_FADE_DISTANCE = 40;
    var NOTES_WIDTH = 28;

    $scope.init = function(canvas) {

        //Timeout to make sure DOM is created for the directive
        $document.ready(function () {

            Paper.setup(canvas[0]);
            canvas.css('background-color', Colorpalette.BACKGROUND);
            $scope.$watch('chesirescale', $scope.scaleChanged);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            $scope.redraw();

        });
    };

    $scope.redraw = function() {
        Paper.view.draw();
        requestanimationframe($scope.redraw);
    };

    $scope.scaleChanged = function(newScale) {

        if(newScale) {

            $scope.createKeyRanges();
            $scope.removeParticles();
            $scope.createParticles();
        }
    };

    $scope.removeParticles = function() {

        if(particles) {
            for(var i=0; i<particles.length; i++) {
                for(var j=0; j<particles[i].length; j++) {
                    particles[i][j].particle.remove();
                }
            }
            particles = false;
        }
    };

    $scope.createParticles = function() {
        if(particles) {
            $scope.removeParticles();
        }
        particles = [];
        var particlesWidth = Math.floor($scope.windowWidth/(PARTICLES_SIZE + PARTICLES_SEPARATION));
        var particlesHeight= Math.floor($scope.windowHeight/(PARTICLES_SIZE + PARTICLES_SEPARATION));
        var x, y, particle;

        for(var i=0; i<particlesWidth; i++) {
            particles[i] = [];
            for(var j=0; j<particlesHeight; j++) {
                x = i*(PARTICLES_SIZE + PARTICLES_SEPARATION) + ((PARTICLES_SIZE + PARTICLES_SEPARATION)/2);
                y = j*(PARTICLES_SIZE + PARTICLES_SEPARATION) + ((PARTICLES_SIZE + PARTICLES_SEPARATION)/2);
                particle = $scope.createParticle(x, y);

                particles[i][j] = {
                    initialX: x,
                    initialY: y,
                    size: PARTICLES_SIZE,
                    particle: particle
                };
            }
        }
    };

    $scope.getPixelsPosition = function(relativePosition) {
        return {
            x: relativePosition.x * $scope.windowWidth,
            y: $scope.windowHeight - (relativePosition.y * $scope.windowHeight)
        };
    };

    $scope.updateParticles = function(position) {

        var pointerPosition = new Paper.Point(position.x, position.y);
        var particlePoint, distance;
        if(particles) {
            for(var i=0; i<particles.length; i++) {
                for(var j=0; j<particles[i].length; j++) {

                    if(position) {
                        particlePoint = new Paper.Point(particles[i][j].initialX, particles[i][j].initialY);
                        distance = particlePoint.getDistance(pointerPosition);
                        if(distance<POINTER_FADE_DISTANCE) {
                            $scope.setParticleSize(particles[i][j], (PARTICLES_SIZE*distance)/POINTER_FADE_DISTANCE);
                        } else {
                            $scope.setParticleSize(particles[i][j], PARTICLES_SIZE);
                        }
                    } else {
                        $scope.setParticleSize(particles[i][j], PARTICLES_SIZE);
                    }
                }
            }
        }
    };

    $scope.createKeyRanges = function() {

        $scope.keyRanges = [];
        var notes = $scope.chesirescale.notes;
        for(var i=0; i<notes.length; i++) {
            $scope.keyRanges.push({
                start: ($scope.windowWidth/(notes.length+1))*(i+1) - (NOTES_WIDTH/2),
                end: ($scope.windowWidth/(notes.length+1))*(i+1) + (NOTES_WIDTH/2)
            });
        }
    };

    $scope.isParticleInKey = function(x) {

        for(var i=0; i<$scope.keyRanges.length; i++) {
            if( (x >= $scope.keyRanges[i].start) && (x < $scope.keyRanges[i].end)) {
                return true;
            }
        }
        return false;
    };

    $scope.createParticle = function(x, y, size) {

        if(!size) {
            size = PARTICLES_SIZE;
        }

        var particle = new Paper.Path.Circle(new Paper.Point(x, y), size/2);
        if($scope.isParticleInKey(x)) {
            particle.fillColor = Colorpalette.PARTICLES_NOTE;
        } else {
            particle.fillColor = Colorpalette.PARTICLES;
        }
        return particle;
    };

    $scope.setParticleSize = function(particle, newSize) {

        if(particle.size !== newSize) {

            particle.particle.remove();
            particle.particle = $scope.createParticle(particle.initialX, particle.initialY, newSize);
            particle.particle.sendToBack();
            particle.size = newSize;
        }
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = $scope.getPixelsPosition(relativePositions);
                $scope.updatePointerPosition(pixelPosition);
                $scope.updateParticles(pixelPosition);
            } else {
                $scope.updatePointerPosition(false);
                $scope.updateParticles(false);
            }
        }
    };

    $scope.updatePointerPosition = function(position) {

        if(position) {
            var x = position.x;
            var y = position.y;

            if(!pointer) {
                pointer = new Paper.Path.Circle(new Paper.Point(x, y), POINTER_SIZE);
                pointer.fillColor = Colorpalette.POINTER;
            } else {
                pointer.position = new Paper.Point(x, y);
            }
        } else {
            if(pointer) {
                pointer.remove();
                pointer = false;
            }
        }
    };

    $scope.canvasResized = function(newWidth, newHeight) {

        $scope.windowWidth = newWidth;
        $scope.windowHeight = newHeight;
    };
});
