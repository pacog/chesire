'use strict';

angular.module('chesireApp')

.service('Colorpalette', function Colorpalette() {
    
    // http://www.colourlovers.com/palette/580974/Adrift_in_Dreams
    // return {
    //     BACKGROUND: '#CFF09E',
    //     PARTICLES: '#79BD9A',
    //     PARTICLES_NOTE: '#3B8686',
    //     POINTER: '#0B486B'
    // };

    // http://www.colourlovers.com/palette/92095/Giant_Goldfish
    // return {
    //     BACKGROUND: '#E0E4CC',
    //     PARTICLES: '#69D2E7',
    //     PARTICLES_NOTE: '#F38630',
    //     POINTER: '#FA6900'
    // };

    // http://www.colourlovers.com/palette/3228090/Unnatural_%E2%99%A5
    return {
        BACKGROUND: '#8BC28A',
        PARTICLES: '#BA8E3D',
        PARTICLES_NOTE: '#D65B27',
        POINTER: '#E32933',
        hex: {
            BACKGROUND: 0x8BC28A,
            PARTICLES: 0xBA8E3D,
            PARTICLES_NOTE: 0xD65B27,
            POINTER: 0xE32933,
        }
    };
});
