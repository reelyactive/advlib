/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../lib/reelyactive/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA = '123456742029' ;

// Expected outputs for the scenario
var EXPECTED_DATA = {
  type: 'EUI-64',
  value: '001bc50941234567',
  flags: {
    transmissionCount: 1
  },
  data: {
    battery: '3.01V',
    temperature: '24.0C'
  }
}

describe('reelyactive', function() {

  // Test the process function
  it('should convert a hexadecimal payload to a JSON packet', function() {
    assert.deepEqual(advlib.process(INPUT_DATA), EXPECTED_DATA);
  });
});