'use strict';

angular.module('chesireApp')

.factory('OscillatorCollection', function () {

    var OscillatorCollectionClass = function(audioContext, nodesInfo) {

        //Hash containing all nodes
        var nodes = {};

        //Node we are connected to
        var connectedTo = null;

        //TODO make it possible to connect to more than one node
        var connect = function(nodeToConnect) {

            connectedTo = nodeToConnect;

            for(var node in nodes) {
                nodes[node].gainNode.connect(nodeToConnect);
            }
        };

        var updateNodes = function(nodesInfo) {

            var node, freq;
            angular.forEach(nodesInfo, function(chord, chordIndex) {
                angular.forEach(chord, function(note) {
                    node = nodes[chordIndex + '___' + note.name];
                    freq = note.freqToPlay || note.freq;
                    node.oscillator.frequency.value = freq;
                    node.gainNode.gain.value = note.gain;
                });
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

        var init = function(audioContext, nodesInfo) {

            if(nodesInfo) {

                angular.forEach(nodesInfo.chords, function(chord, chordIndex) {
                    angular.forEach(chord.notes, function(note) {

                        var newOscillator = audioContext.createOscillator();
                        newOscillator.type = newOscillator.SINE;
                        var newGainController = audioContext.createGainNode();
                        newGainController.gain.value = 0;
                        newOscillator.connect(newGainController);
                        newOscillator.noteOn(0);

                        nodes[chordIndex + '___' + note.name] = {
                            oscillator: newOscillator,
                            gainNode: newGainController
                        };
                    });
                });

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
