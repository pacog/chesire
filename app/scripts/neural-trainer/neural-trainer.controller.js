/* global Architect */
/* global Trainer */
/* global Network */
//TODO extract this to service
(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('NeuralTrainerController', NeuralTrainerController);

    function NeuralTrainerController(Leapmotion, localStorageService) {
        var TIME_GAP_FOR_KEYS = 15; //ms
        var vm = this;
        var infoLines = [];
        var keysPressed = [];
        var body = null;

        vm.toggleShow = toggleShow;

        vm.startRecording = startRecording;
        vm.stopRecording = stopRecording;
        vm.startTesting = startTesting;
        vm.stopTesting = stopTesting;

        vm.show = false;
        vm.recording = false;

        init();

        function init() {
            var lastNetwork = localStorageService.get('lastNeuralNetwork');
            if(lastNetwork) {
                vm.neuralNetwork = Network.fromJSON(lastNetwork);
                vm.stringNetwork = lastNetwork;
            }
        }


        function toggleShow() {
            vm.show = !vm.show;
        }

        function startRecording() {
            vm.recording = true;
            Leapmotion.subscribeToFrameDeviceChange(onEachFrame);
            infoLines = [];
            keysPressed = [];
            vm.neuralNetwork = null;

            body = body || angular.element(document.body);
            body.on('keyup', keyUp);
        }

        function stopRecording() {
            vm.recording = false;
            Leapmotion.unsubscribeToFrameDeviceChange(onEachFrame);
            body.off('keyup', keyUp);
            trainNetwork();
        }

        function startTesting() {
            vm.testing = true;
            Leapmotion.subscribeToFrameDeviceChange(onEachFrameTesting);
        }

        function stopTesting() {
            vm.testing = false;
            vm.isActive = false;
            Leapmotion.unsubscribeToFrameDeviceChange(onEachFrameTesting);
        }

        function onEachFrameTesting(frameInfo) {
            var newInfoLines = getInfoArrayFromFrame(frameInfo);
            vm.output = vm.neuralNetwork.activate(newInfoLines.params)[0];
            if(vm.output > 0.5) {
                console.log(vm.output);
            }
        }

        function onEachFrame(frameInfo) {

            var newInfoLines = getInfoArrayFromFrame(frameInfo);
            infoLines.push(newInfoLines);

        }

        function getInfoArrayFromFrame(frameInfo) {
            
            var time = (new Date()).getTime();
            var motionParams = false;
            if(frameInfo.frame.hands && frameInfo.frame.hands[0]) {
                motionParams = Leapmotion.getRelativePositions(frameInfo.frame, frameInfo.frame.hands);
            }
            var info = {
                time: time,
                params: [
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.xVelocity : 0,
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.yVelocity : 0,
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.zVelocity : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.xDirection : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.yDirection : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.zDirection : 0
                ]
            };
            
            return info;
        }

        function keyUp() {
            keysPressed.push({ time: (new Date()).getTime()});
        }

        function trainNetwork() {
            var trainingSet = [];
            for(var i=0; i<infoLines.length; i++) {
                infoLines[i].output = getOutputforLine(infoLines[i]);
                trainingSet.push({
                    input: infoLines[i].params,
                    output: [infoLines[i].output]
                });
            }
            // vm.neuralNetwork = new Architect.Perceptron(3,9,1);
            console.log('Started Training!');
            vm.neuralNetwork = new Architect.LSTM(6,8,8,1);
            var trainer = new Trainer(vm.neuralNetwork);
            trainer.train(trainingSet, {
                iterations: 20000,
                error: 0.005,
                log: 1000
            });
            console.log('Finished Training!');
            vm.stringNetwork = vm.neuralNetwork.toJSON();
            console.log(vm.stringNetwork);
            debugger;
            localStorageService.set('lastNeuralNetwork', vm.stringNetwork);
        }

        function getOutputforLine(line) {
            for(var i=0; i<keysPressed.length; i++) {
                var timeDiffKeyPress = Math.abs(keysPressed[i].time - line.time);
                if(timeDiffKeyPress < TIME_GAP_FOR_KEYS) {
                    return 1;
                }
            }
            return 0;
        }

    }

})();