'use strict';

describe('Service: Audiocontext', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Audiocontext;
  beforeEach(inject(function (_Audiocontext_) {
    Audiocontext = _Audiocontext_;
  }));

  it('should do something', function () {
    expect(!!Audiocontext).toBe(true);
  });

});
