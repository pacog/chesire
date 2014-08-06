'use strict';

angular.module('chesireApp')

.factory('OscillatorCollection', function (Audiocontext) {

    var OscillatorCollectionClass = function(oscillatorOptions) {

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

        var getOscillatorTypeFromOptions = function(options) {
            if(!options) {
                return 'sine';
            } else {
                return options.oscillatorType || 'sine';
            }
        };

        var init = function(nodesConfig, synthConfig) {
            //TODO: take into account volume/glissando option
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
                    var newOscillator = Audiocontext.createOscillator();
                    var newGainController = Audiocontext.createGain();
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
            angular.forEach(nodes, function(node) {
                node.oscillator.type = getOscillatorTypeFromOptions(synthConfig);
            });

        };

        var getNodes = function() {
            return nodes;
        };

        //TODO: this is bad, we do this because at some point we'll call init with the correct scale
        init(undefined, oscillatorOptions);

        return {
            connect:                connect,
            updateNodes:            updateNodes,
            destroy:                destroy,
            init:                   init,
            getNodes:               getNodes
        };
    };

    return OscillatorCollectionClass;
});
