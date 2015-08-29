'use strict';

angular.module('chesireApp')

.factory('OscillatorCollection', function (Audiocontext, MultiNotesHelper) {

    var OscillatorCollectionClass = function(oscillatorOptions) {

        var nodes = [];
        var nodesHash = {};

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
            angular.forEach(nodesInfo, function(note) {
                node = nodes[nodesHash[note.name]];
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
            destroy();
            if(nodesConfig) {
                var notesWeCanPlayAtOnce = MultiNotesHelper.getNotesDefinition(nodesConfig, synthConfig);
                nodes = [];
                nodesHash = {};

                for(var i=0; i<notesWeCanPlayAtOnce.length; i++) {
                    var newOscillator = Audiocontext.createOscillator();
                    var newGainController = Audiocontext.createGain();
                    newGainController.gain.value = 0;
                    newOscillator.connect(newGainController);
                    newOscillator.start(0);

                    nodesHash[notesWeCanPlayAtOnce[i].name] = i;
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
