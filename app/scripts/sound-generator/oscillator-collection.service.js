(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('OscillatorCollection', OscillatorCollection);

    function OscillatorCollection($q, $timeout, Audiocontext, MultiNotesHelper, OscillatorCollectionNode) {

        return OscillatorCollectionClass;

        function OscillatorCollectionClass(oscillatorOptions) {
            var nodes = [];
            var nodesHash = {};
            var connectedTo = null;

            var object = {
                connect:                connect,
                updateNodes:            updateNodes,
                destroy:                destroy,
                init:                   init,
                getNodes:               getNodes,
                playNote:               playNote
            };

            init(undefined, oscillatorOptions);

            return object;


            function init(nodesConfig, synthConfig) {
                destroy();
                if(nodesConfig) {
                    var notesWeCanPlayAtOnce = MultiNotesHelper.getNotesDefinition(nodesConfig, synthConfig);
                    nodes = [];
                    nodesHash = {};

                    for(var i=0; i<notesWeCanPlayAtOnce.length; i++) {
                        var newNode = new OscillatorCollectionNode(synthConfig);
                        nodesHash[notesWeCanPlayAtOnce[i].name] = i;
                        nodes.push(newNode);
                    }

                    if(connectedTo) {
                        connect(connectedTo);
                    }
                }
            }


            function connect(nodeToConnect) {

                connectedTo = nodeToConnect;

                for(var i=0; i<nodes.length; i++) {
                    nodes[i].connect(nodeToConnect);
                }

            }

            function updateNodes(nodesInfo) {
                var node, freq;
                angular.forEach(nodesInfo, function(note) {
                    node = nodes[nodesHash[note.name]];
                    freq = note.freqToPlay;
                    node.setGain(note.gain);
                    node.setFrequency(freq);
                });
            }

            function getNodes() {
                return nodes;
            }

            //Old method use to preview a note, don't pay much attention to this and remove at some point
            function playNote(note, duration) {
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
            }


            function destroy() {

                for(var i=0; i<nodes.length; i++) {
                    nodes[i].destroy();
                }

                nodes = [];
            }
        }

    }

})();
