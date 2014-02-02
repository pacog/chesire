'use strict';

describe('Service: Pixi', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Pixi;
  beforeEach(inject(function (_Pixi_) {
    Pixi = _Pixi_;
  }));

  it('should do something', function () {
    expect(!!Pixi).toBe(true);
  });

});
