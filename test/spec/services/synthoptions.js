'use strict';

describe('Service: Synthoptions', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Synthoptions;
  beforeEach(inject(function (_Synthoptions_) {
    Synthoptions = _Synthoptions_;
  }));

  it('should do something', function () {
    expect(!!Synthoptions).toBe(true);
  });

});