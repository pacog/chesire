'use strict';

angular.module('chesireApp')
    .factory('SpaceConverter', function() {

        var BOX_SIZE = {
            width: 221,
            height: 221,
            depth: 154
        };

        var BOX_LIMITS = {
            xMin: -(BOX_SIZE.width/2),
            xMax: (BOX_SIZE.width/2),
            yMin: 0,
            yMax: BOX_SIZE.height,
            zMin: -(BOX_SIZE.depth/2),
            zMax: (BOX_SIZE.depth/2)
        };

        var getBoxLimits = function() {
            return BOX_LIMITS;
        };

        var getConvertedPosition = function(original) {

            return {
                x: original.x * (BOX_LIMITS.xMax - BOX_LIMITS.xMin) + BOX_LIMITS.xMin,
                y: (original.y * (BOX_LIMITS.yMax - BOX_LIMITS.yMin) + BOX_LIMITS.yMin),
                z: (original.z * (BOX_LIMITS.zMax - BOX_LIMITS.zMin) + BOX_LIMITS.zMin)
            };
        };

        return {
            getBoxLimits: getBoxLimits,
            getConvertedPosition: getConvertedPosition
        };
    });