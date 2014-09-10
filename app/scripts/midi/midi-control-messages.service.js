'use strict';

angular.module('chesireApp')

  .constant('MidiControlMessages', [
  {
    name: 'Bank Select',
    number: 0
  },{
    name: 'Modulation Wheel or Lever',
    number: 1
  },{
    name: 'Breath Controller',
    number: 2
  },{
    name: 'Undefined (3)',
    number: 3
  },{
    name: 'Foot Controller',
    number: 4
  },{
    name: 'Portamento Time',
    number: 5
  },{
    name: 'Data Entry MSB',
    number: 6
  },{
    name: 'Channel Volume (formerly Main Volume)',
    number: 7
  },{
    name: 'Balance',
    number: 8
  },{
    name: 'Undefined (9)',
    number: 9
  },{
    name: 'Pan',
    number: 10
  },{
    name: 'Expression Controller',
    number: 11
  },{
    name: 'Effect Control 1',
    number: 12
  },{
    name: 'Effect Control 2',
    number: 13
  },{
    name: 'Undefined (14)',
    number: 14
  },{
    name: 'Undefined (15)',
    number: 15
  },{
    name: 'General Purpose Controller 1',
    number: 16
  },{
    name: 'General Purpose Controller 2',
    number: 17
  },{
    name: 'General Purpose Controller 3',
    number: 18
  },{
    name: 'General Purpose Controller 4',
    number: 19
  },{
    name: 'Undefined (20)',
    number: 20
  },{
    name: 'Undefined (21)',
    number: 21
  },{
    name: 'Undefined (22)',
    number: 22
  },{
    name: 'Undefined (23)',
    number: 23
  },{
    name: 'Undefined (24)',
    number: 24
  },{
    name: 'Undefined (25)',
    number: 25
  },{
    name: 'Undefined (26)',
    number: 26
  },{
    name: 'Undefined (27)',
    number: 27
  },{
    name: 'Undefined (28)',
    number: 28
  },{
    name: 'Undefined (29)',
    number: 29
  },{
    name: 'Undefined (30)',
    number: 30
  },{
    name: 'Undefined (31)',
    number: 31
  },{
    name: 'Damper Pedal on/off (Sustain)',
    number: 64
  },{
    name: 'Portamento On/Off',
    number: 65
  },{
    name: 'Sostenuto On/Off',
    number: 66
  },{
    name: 'Soft Pedal On/Off',
    number: 67
  },{
    name: 'Legato Footswitch',
    number: 68
  },{
    name: 'Hold 2',
    number: 69
  },{
    name: 'Sound Controller 1 (default: Sound Variation)',
    number: 70
  },{
    name: 'Sound Controller 2 (default: Timbre/Harmonic Intens.)',
    number: 71
  },{
    name: 'Sound Controller 3 (default: Release Time)',
    number: 72
  },{
    name: 'Sound Controller 4 (default: Attack Time)',
    number: 73
  },{
    name: 'Sound Controller 5 (default: Brightness)',
    number: 74
  },{
    name: 'Sound Controller 6 (default: Decay Time)',
    number: 75
  },{
    name: 'Sound Controller 7 (default: Vibrato Rate)',
    number: 76
  },{
    name: 'Sound Controller 8 (default: Vibrato Depth)',
    number: 77
  },{
    name: 'Sound Controller 9 (default: Vibrato Delay)',
    number: 78
  },{
    name: 'Sound Controller 10 (default undefined)',
    number: 79
  }
  //TODO: add all from http://www.midi.org/techspecs/midimessages.php
  ]);