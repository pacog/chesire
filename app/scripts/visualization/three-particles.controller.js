'use strict';

angular.module('chesireApp')

.controller('ThreeparticlesCtrl', function ($scope, $timeout, $q, windowResize, Three, Leapmotion, Colorpalette, ScaleOptions, SpaceConverter, HandModel, BoundariesModel, PointerModel, SoundMeshModel, VisualizationKeyHelper, Camera, ChordsHelperModel, playerBoundaries) {

    var whenSceneIsReady = $q.defer();

    var handModel = null;
    var boundariesModel = null;
    var pointerModel = null;
    var soundMeshModel = null;
    var chordsHelperModel = null;
    var camera = null;
    var myElement = null;
    var lastSong = null;

    $scope.init = function(element) {
        myElement = element;
        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged); //TODO: use leap onFrame
            $scope.renderer.render($scope.scene, camera.getCamera());
            whenSceneIsReady.resolve(true);
        });
        ScaleOptions.subscribeToChangesInScaleOptions(scaleChanged);
        windowResize.observer.subscribe(windowResized);
    };

    function windowResized() {
        if(myElement) {
            createScene(myElement);
            createMeshes(lastSong);
        }
    }


    var scaleChanged = function(newSong) {
        if(newSong) {
            lastSong = newSong;
            whenSceneIsReady.promise.then(function () {
                createMeshes(newSong);
            });
        }
    };

    function createMeshes(song) {
        VisualizationKeyHelper.createKeyRanges(song.getCurrentPart());
        if(soundMeshModel) {
            soundMeshModel.destroy();
        }
        if(chordsHelperModel){
            chordsHelperModel.destroy();
        }
        // soundMeshModel = new SoundMeshModel($scope.scene);
        chordsHelperModel = new ChordsHelperModel($scope.scene);
    }

    var createScene = function(element) {
        element.html('');
        element.addClass('chesirecanvas');
        var height = element[0].offsetHeight,
            width = element[0].offsetWidth;

        $scope.scene = new Three.Scene();
        pointerModel = new PointerModel($scope.scene);
        handModel = new HandModel($scope.scene);
        boundariesModel = new BoundariesModel($scope.scene);

        //Camera...
        camera = new Camera($scope.scene, {
            screenHeight: height,
            screenWidth: width
        });

        //Lights...
        $scope.pointLight = new Three.PointLight(0xffffff);
        $scope.pointLight.position.set(10, 150, 130);
        $scope.scene.add($scope.pointLight);
        //Action!
        $scope.renderer = new Three.WebGLRenderer();
        $scope.renderer.setClearColor( Colorpalette.hex.BACKGROUND, 1);
        $scope.renderer.setSize( width, height );
        element.append($scope.renderer.domElement);
        playerBoundaries.setCamera(camera.getCamera());
        playerBoundaries.setRenderer($scope.renderer);
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = SpaceConverter.getConvertedPosition(relativePositions);
                handModel.update(frame.hands[0], frame);
                pointerModel.update(pixelPosition);
                // soundMeshModel.update(pixelPosition);
                chordsHelperModel.update(relativePositions.x);
            } else {
                //TODO: remove hand and put everything at rest
            }
            $scope.renderer.render($scope.scene, camera.getCamera());
        }
    };
});
