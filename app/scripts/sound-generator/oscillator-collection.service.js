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
                connectTo:                connectTo,
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
                        connectTo(connectedTo);
                    }
                }
            }


            function connectTo(destination) {

                if(!destination.connect && destination.getAudioNode) {
                    destination = destination.getAudioNode();
                }

                connectedTo = destination;

                for(var i=0; i<nodes.length; i++) {
                    nodes[i].connect(destination);
                }

            }

            function updateNodes(nodesInfo) {
                var node, freq, note;
                for(var i=0; i<nodesInfo.length; i++) {
                    note = nodesInfo[i];
                    node = nodes[nodesHash[note.name]];
                    freq = note.freqToPlay;
                    node.setGain(note.gain);
                    node.setFrequency(freq);
                    node.updateFM(nodesInfo.fmInfo);
                }
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
