'use strict';

describe('Service: MotionParamsList', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var MotionParamsList;
  beforeEach(inject(function (_MotionParamsList_) {
    MotionParamsList = _MotionParamsList_;
  }));

  it('should do something', function () {
    expect(!!MotionParamsList).toBe(true);
  });

});
