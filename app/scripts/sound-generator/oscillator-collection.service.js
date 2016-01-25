'use strict';

angular.module('chesireApp')

.factory('OscillatorCollection', function ($q, $timeout, Audiocontext, MultiNotesHelper) {

    var OscillatorCollectionClass = function(oscillatorOptions) {

        var nodes = [];
        var nodesHash = {};

        var connectedTo = null;

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
                var oscillatorType = getOscillatorTypeFromOptions(synthConfig);

                if(oscillatorType === 'custom') {
                    assignPeriodicTableFromOptions(node.oscillator, synthConfig);
                } else {
                    node.oscillator.type = oscillatorType;
                }

            });
        };

        var assignPeriodicTableFromOptions = function(oscillator, config) {
            config.realPeriodicTable = config.realPeriodicTable || [0, 1];
            config.imaginaryPeriodicTable = config.imaginaryPeriodicTable || [0, 0];

            var realArray = new Float32Array(config.realPeriodicTable);
            var imaginaryArray = new Float32Array(config.imaginaryPeriodicTable);

            var wave = Audiocontext.createPeriodicWave(realArray, imaginaryArray);
            oscillator.setPeriodicWave(wave);
        };

        var getNodes = function() {
            return nodes;
        };

        var playNote = function(note, duration) {
            var willPlay = $q.defer();
            if(nodes[0]) {
                var oldFreq = nodes[0].oscillator.frequency.value;

                nodes[0].oscillator.frequency.value = note.freq;
                nodes[0].gainNode.gain.value = 0.5;
                $timeout(function() {
                    nodes[0].oscillator.frequency.value = oldFreq;
                    nodes[0].gainNode.gain.value = 0;
                    willPlay.resolve();
                }, duration);
            } else {
                willPlay.resolve();
            }
            return willPlay.promise;
        };

        //TODO: this is bad, we do this because at some point we'll call init with the correct scale
        init(undefined, oscillatorOptions);

        return {
            connect:                connect,
            updateNodes:            updateNodes,
            destroy:                destroy,
            init:                   init,
            getNodes:               getNodes,
            playNote:               playNote
        };
    };

    return OscillatorCollectionClass;
});
