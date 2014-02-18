'use strict';

describe('Service: MultiNotesHelper', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var MultiNotesHelper;
  beforeEach(inject(function (_MultiNotesHelper_) {
    MultiNotesHelper = _MultiNotesHelper_;
  }));

  it('should do something', function () {
    expect(!!MultiNotesHelper).toBe(true);
  });

});
