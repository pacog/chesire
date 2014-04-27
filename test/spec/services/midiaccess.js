'use strict';

describe('Service: MidiAccess', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var MidiAccess;
  beforeEach(inject(function (_MidiAccess_) {
    MidiAccess = _MidiAccess_;
  }));

  it('should do something', function () {
    expect(!!MidiAccess).toBe(true);
  });

});
