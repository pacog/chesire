'use strict';

describe('Service: Three', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Three;
  beforeEach(inject(function (_Three_) {
    Three = _Three_;
  }));

  it('should do something', function () {
    expect(!!Three).toBe(true);
  });

});
