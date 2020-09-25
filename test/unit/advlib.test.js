/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const advlib = require('../../lib/advlib.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_PACKETS = [ '4006ab8967452301' ];
const INPUT_DATA_PACKET = '4006ab8967452301';
const INPUT_DATA_NO_PROCESSORS = [];
const INPUT_DATA_INVALID_PROCESSORS = [
    { processor: { }, libraries: [] }
];
const INPUT_DATA_PROCESSORS = [
    { processor: { process: function(data) { return { isProcessor: true }; } },
      libraries: [] }
];


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_VALID_INPUT = { isProcessor: true };


// Describe the scenario
describe('advlib', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with no processor array
  it('should handle no processor array', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_PACKETS),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with empty processor array
  it('should handle empty processor array', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_PACKETS,
                                    INPUT_DATA_NO_PROCESSORS),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid processor array
  it('should handle invalid processor array', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_PACKETS,
                                    INPUT_DATA_INVALID_PROCESSORS),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid packet array data
  it('should handle valid packet array data', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_PACKETS, INPUT_DATA_PROCESSORS),
                     EXPECTED_DATA_VALID_INPUT);
  });

  // Test the process function with valid packet data
  it('should handle valid packet data', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_PACKET, INPUT_DATA_PROCESSORS),
                     EXPECTED_DATA_VALID_INPUT);
  });

});