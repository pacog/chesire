'use strict';

describe('Service: ScaleOptions', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var ScaleOptions;
  beforeEach(inject(function (_ScaleOptions_) {
    ScaleOptions = _ScaleOptions_;
  }));

  it('should do something', function () {
    expect(!!ScaleOptions).toBe(true);
  });

});
