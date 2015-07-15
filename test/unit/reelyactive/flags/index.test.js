/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../../lib/reelyactive/flags/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA = '4' ;

// Expected outputs for the scenario
var EXPECTED_DATA =  {
  transmissionCount: 1
}

describe('reelyactive flags', function() {

  // Test the process function
  it('should convert a hexadecimal flag to JSON', function() {
    assert.deepEqual(advlib.process(INPUT_DATA), EXPECTED_DATA);
  });
});