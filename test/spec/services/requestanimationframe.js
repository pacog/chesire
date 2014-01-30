'use strict';

describe('Service: Requestanimationframe', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Requestanimationframe;
  beforeEach(inject(function (_Requestanimationframe_) {
    Requestanimationframe = _Requestanimationframe_;
  }));

  it('should do something', function () {
    expect(!!Requestanimationframe).toBe(true);
  });

});
