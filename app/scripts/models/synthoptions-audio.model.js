(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel(synthOptionsAudioDefault) {
        var factory = {
            create: create
        };

        function SynthoptionsAudioClass(options) {
            this.init(options);
        }

        SynthoptionsAudioClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, synthOptionsAudioDefault.get(), options);
        };


        return factory;

        function create(options) {
            return new SynthoptionsAudioClass(options);
        }
    }

})();