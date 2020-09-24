/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const advlib = require("../../lib/advlib.js");
const assert = require ('assert');


// Input data for the scenario


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;


// Describe the scenario
describe('advlib', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.process(), EXPECTED_DATA_INVALID_INPUT);
  });

});