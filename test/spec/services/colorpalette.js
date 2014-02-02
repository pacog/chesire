'use strict';

describe('Service: Colorpalette', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Colorpalette;
  beforeEach(inject(function (_Colorpalette_) {
    Colorpalette = _Colorpalette_;
  }));

  it('should do something', function () {
    expect(!!Colorpalette).toBe(true);
  });

});
