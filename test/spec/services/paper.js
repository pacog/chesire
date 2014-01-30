'use strict';

describe('Service: Paper', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var Paper;
  beforeEach(inject(function (_Paper_) {
    Paper = _Paper_;
  }));

  it('should do something', function () {
    expect(!!Paper).toBe(true);
  });

});
