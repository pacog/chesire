'use strict';

describe('Service: SynthOptions', function() {

    // load the service's module
    beforeEach(module('chesireApp'));

    // instantiate service
    var SynthOptions;
    beforeEach(inject(function(_SynthOptions_) {
        SynthOptions = _SynthOptions_;
    }));

    it('should do something', function() {
        expect( !! SynthOptions).toBe(true);
    });

});