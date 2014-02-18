'use strict';

angular.module('chesireApp')

.constant('Notes', [
// {
//     name: 'C0',
//     freq: 16.35
// }, {
//     name: 'C#0',
//     freq: 17.32
// }, {
//     name: 'D0',
//     freq: 18.35
// }, {
//     name: 'D#0',
//     freq: 19.45
// }, {
//     name: 'E0',
//     freq: 20.60
// }, {
//     name: 'F0',
//     freq: 21.83
// }, {
//     name: 'F#0',
//     freq: 23.12
// }, {
//     name: 'G0',
//     freq: 24.50
// }, {
//     name: 'G#0',
//     freq: 25.96
// }, {
//     name: 'A0',
//     freq: 27.50
// }, {
//     name: 'A#0',
//     freq: 29.14
// }, {
//     name: 'B0',
//     freq: 30.87
// }, {
//     name: 'C1',
//     freq: 32.70
// }, {
//     name: 'C#1',
//     freq: 34.65
// }, {
//     name: 'D1',
//     freq: 36.71
// }, {
//     name: 'D#1',
//     freq: 38.89
// }, {
//     name: 'E1',
//     freq: 41.20
// }, {
//     name: 'F1',
//     freq: 43.65
// }, {
//     name: 'F#1',
//     freq: 46.25
// }, {
//     name: 'G1',
//     freq: 49.00
// }, {
//     name: 'G#1',
//     freq: 51.91
// }, {
//     name: 'A1',
//     freq: 55.00
// }, {
//     name: 'A#1',
//     freq: 58.27
// }, {
//     name: 'B1',
//     freq: 61.74
// }, {
//     name: 'C2',
//     freq: 65.41
// }, {
//     name: 'C#2',
//     freq: 69.30
// }, {
//     name: 'D2',
//     freq: 73.42
// }, {
//     name: 'D#2',
//     freq: 77.78
// }, {
//     name: 'E2',
//     freq: 82.41
// }, {
//     name: 'F2',
//     freq: 87.31
// }, {
//     name: 'F#2',
//     freq: 92.50
// }, {
//     name: 'G2',
//     freq: 98.00
// }, {
//     name: 'G#2',
//     freq: 103.83
// }, {
//     name: 'A2',
//     freq: 110.00
// }, {
//     name: 'A#2',
//     freq: 116.54
// }, {
//     name: 'B2',
//     freq: 123.47
// },
{
    name: 'C3',
    freq: 130.81
}, {
    name: 'C#3',
    freq: 138.59
}, {
    name: 'D3',
    freq: 146.83
}, {
    name: 'D#3',
    freq: 155.56
}, {
    name: 'E3',
    freq: 164.81
}, {
    name: 'F3',
    freq: 174.61
}, {
    name: 'F#3',
    freq: 185.00
}, {
    name: 'G3',
    freq: 196.00
}, {
    name: 'G#3',
    freq: 207.65
}, {
    name: 'A3',
    freq: 220.00
}, {
    name: 'A#3',
    freq: 233.08
}, {
    name: 'B3',
    freq: 246.94
}, {
    name: 'C4',
    freq: 261.63
}, {
    name: 'C#4',
    freq: 277.18
}, {
    name: 'D4',
    freq: 293.66
}, {
    name: 'D#4',
    freq: 311.13
}, {
    name: 'E4',
    freq: 329.63
}, {
    name: 'F4',
    freq: 349.23
}, {
    name: 'F#4',
    freq: 369.99
}, {
    name: 'G4',
    freq: 392.00
}, {
    name: 'G#4',
    freq: 415.30
}, {
    name: 'A4',
    freq: 440.00
}, {
    name: 'A#4',
    freq: 466.16
}, {
    name: 'B4',
    freq: 493.88
}, {
    name: 'C5',
    freq: 523.25
}, {
    name: 'C#5',
    freq: 554.37
}, {
    name: 'D5',
    freq: 587.33
}, {
    name: 'D#5',
    freq: 622.25
}, {
    name: 'E5',
    freq: 659.25
}, {
    name: 'F5',
    freq: 698.46
}, {
    name: 'F#5',
    freq: 739.99
}, {
    name: 'G5',
    freq: 783.99
}, {
    name: 'G#5',
    freq: 830.61
}, {
    name: 'A5',
    freq: 880.00
}, {
    name: 'A#5',
    freq: 932.33
}, {
    name: 'B5',
    freq: 987.77
}, {
    name: 'C6',
    freq: 1046.50
}, {
    name: 'C#6',
    freq: 1108.73
}, {
    name: 'D6',
    freq: 1174.66
}, {
    name: 'D#6',
    freq: 1244.51
}, {
    name: 'E6',
    freq: 1318.51
}, {
    name: 'F6',
    freq: 1396.91
}, {
    name: 'F#6',
    freq: 1479.98
}, {
    name: 'G6',
    freq: 1567.98
}, {
    name: 'G#6',
    freq: 1661.22
}, {
    name: 'A6',
    freq: 1760.00
}, {
    name: 'A#6',
    freq: 1864.66
}, {
    name: 'B6',
    freq: 1975.53
}, {
    name: 'C7',
    freq: 2093.00
}, {
    name: 'C#7',
    freq: 2217.46
},
{
    name: 'D7',
    freq: 2349.32
}
// ,{
//     name: 'D#7',
//     freq: 2489.02
// }, {
//     name: 'E7',
//     freq: 2637.02
// }, {
//     name: 'F7',
//     freq: 2793.83
// }, {
//     name: 'F#7',
//     freq: 2959.96
// }, {
//     name: 'G7',
//     freq: 3135.96
// }, {
//     name: 'G#7',
//     freq: 3322.44
// }, {
//     name: 'A7',
//     freq: 3520.00
// }, {
//     name: 'A#7',
//     freq: 3729.31
// }, {
//     name: 'B7',
//     freq: 3951.07
// }, {
//     name: 'C8',
//     freq: 4186.01
// }, {
//     name: 'C#8',
//     freq: 4434.92
// }, {
//     name: 'D8',
//     freq: 4698.63
// }, {
//     name: 'D#8',
//     freq: 4978.03
// }, {
//     name: 'E8',
//     freq: 5274.04
// }, {
//     name: 'F8',
//     freq: 5587.65
// }, {
//     name: 'F#8',
//     freq: 5919.91
// }, {
//     name: 'G8',
//     freq: 6271.93
// }, {
//     name: 'G#8',
//     freq: 6644.88
// }, {
//     name: 'A8',
//     freq: 7040.00
// }, {
//     name: 'A#8',
//     freq: 7458.62
// }, {
//     name: 'B8',
//     freq: 7902.13
// }
]);

