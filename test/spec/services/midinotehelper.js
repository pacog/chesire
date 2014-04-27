'use strict';

describe('Service: MidiNoteHelper', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var MidiNoteHelper;
  beforeEach(inject(function (_MidiNoteHelper_) {
    MidiNoteHelper = _MidiNoteHelper_;
  }));

  it('should do something', function () {
    expect(!!MidiNoteHelper).toBe(true);
  });

});
