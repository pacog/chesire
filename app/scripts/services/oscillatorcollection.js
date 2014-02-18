'use strict';

angular.module('chesireApp')

.factory('OscillatorCollection', function () {

    var OscillatorCollectionClass = function(audioContext, nodesInfo) {

        var nodes = [];

        //Node we are connected to
        var connectedTo = null;

        //TODO make it possible to connect to more than one node
        var connect = function(nodeToConnect) {

            connectedTo = nodeToConnect;

            angular.forEach(nodes, function(node) {
                node.gainNode.connect(nodeToConnect);
            });
        };

        var updateNodes = function(nodesInfo) {

            var node, freq;
            angular.forEach(nodesInfo, function(note, noteIndex) {
                node = nodes[noteIndex];
                freq = note.freqToPlay;
                node.gainNode.gain.value = note.gain;
                if(freq) {
                    node.oscillator.frequency.value = freq;
                }
            });
        };

        var destroy = function() {

            for(var i=0; i<nodes.length; i++) {

                nodes[i].oscillator.disconnect(nodes[i].gainNode);
                if(connectedTo) {
                    nodes[i].gainNode.disconnect(connectedTo);
                }
            }
            
            nodes = [];
        };

        var init = function(audioContext, nodesConfig) {

            destroy();

            if(nodesConfig) {

                nodes = [];
                var biggestChord = 0;
                angular.forEach(nodesConfig.chords, function(chord) {
                    if(chord.notes.length > biggestChord) {
                        biggestChord = chord.notes.length;
                    }
                });

                for(var i=0; i<biggestChord; i++) {
                    var newOscillator = audioContext.createOscillator();
                    newOscillator.type = newOscillator.SINE;
                    var newGainController = audioContext.createGainNode();
                    newGainController.gain.value = 0;
                    newOscillator.connect(newGainController);
                    newOscillator.noteOn(0);

                    nodes.push({
                        oscillator: newOscillator,
                        gainNode: newGainController
                    });
                }

                if(connectedTo) {
                    connect(connectedTo);
                }
            }
        };

        var changeOscillatorType = function(newType) {

            angular.forEach(nodes, function(node) {
                node.oscillator.type = newType;
            });
        };

        init(audioContext, nodesInfo);

        return {
            connect:                connect,
            updateNodes:            updateNodes,
            destroy:                destroy,
            init:                   init,
            changeOscillatorType:   changeOscillatorType
        };
    };

    return OscillatorCollectionClass;
});
