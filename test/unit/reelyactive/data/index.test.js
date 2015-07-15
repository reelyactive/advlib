/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../../lib/reelyactive/data/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA = '2029' ;

// Expected outputs for the scenario
var EXPECTED_DATA =  {
  battery: '3.01V',
  temperature: '24.0C'
}

describe('reelyactive data', function() {

  // Test the process function
  it('should convert a hexadecimal data payload to JSON', function() {
    assert.deepEqual(advlib.process(INPUT_DATA), EXPECTED_DATA);
  });
});