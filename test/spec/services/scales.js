'use strict';

describe('Service: Scales', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Scales;
  beforeEach(inject(function (_Scales_) {
    Scales = _Scales_;
  }));

  it('should do something', function () {
    expect(!!Scales).toBe(true);
  });

});
