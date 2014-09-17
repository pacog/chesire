'use strict';

angular.module('chesireApp')

.controller('ThreeparticlesCtrl', function ($scope, $timeout, $q, Three, Leapmotion, Colorpalette, ScaleOptions, SpaceConverter, HandModel, BoundariesModel, PointerModel, SoundMeshModel, VisualizationKeyHelper, Camera) {

    var whenSceneIsReady = $q.defer();

    var handModel = null;
    var boundariesModel = null;
    var pointerModel = null;
    var soundMeshModel = null;
    var camera = null;

    $scope.init = function(element) {
        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged); //TODO: use leap onFrame
            $scope.renderer.render($scope.scene, camera.getCamera());
            whenSceneIsReady.resolve(true);
        });
        ScaleOptions.subscribeToChangesInScaleOptions(scaleChanged);
    };


    var scaleChanged = function(newScale) {
        if(newScale) {
            whenSceneIsReady.promise.then(function () {
                VisualizationKeyHelper.createKeyRanges(newScale);
                soundMeshModel = new SoundMeshModel($scope.scene);
            });
        }
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
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = SpaceConverter.getConvertedPosition(relativePositions);
                handModel.update(frame.hands[0], frame);
                pointerModel.update(pixelPosition);
                soundMeshModel.update(pixelPosition);
            } else {
                //TODO: remove hand and put everything at rest
            }
            $scope.renderer.render($scope.scene, camera.getCamera());
        }
    };
});
