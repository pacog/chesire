'use strict';

angular.module('chesireApp')
    .factory('OscillatorClass', function(MultiNotesHelper, OscillatorCollection) {

        var OscillatorClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        OscillatorClass.prototype = {

            init: function(options) {
                this.options = options;
                this.oscillatorCollection = new OscillatorCollection();
            },

            changeScale: function(newScale) {
                MultiNotesHelper.changeNotes(newScale);
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                this.oscillatorCollection.init(newScale);
            },

            updateNotesBeingPlayed: function(x) {
                var notesInfo = MultiNotesHelper.getNotesInfo(x, this.synthOptions);
                this.oscillatorCollection.updateNodes(notesInfo);
            },

            connectTo: function(destination) {
                this.oscillatorCollection.connect(destination);
            },

            destroy: function() {
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
            }
        };

        return OscillatorClass;
    });