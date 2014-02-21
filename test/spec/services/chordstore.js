'use strict';

describe('Service: ChordStore', function () {

  // load the service's module
  beforeEach(module('chesireApp'));

  // instantiate service
  var ChordStore;
  beforeEach(inject(function (_ChordStore_) {
    ChordStore = _ChordStore_;
  }));

  it('should do something', function () {
    expect(!!ChordStore).toBe(true);
  });

});
