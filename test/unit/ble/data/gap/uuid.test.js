/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */

var uuid = require("../../../../../lib/ble/data/gap/uuid.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_NC_16 = 'd8fe';
var INPUT_DATA_C_16 = 'd8fe';
var INPUT_DATA_NC_128 = '4449555520657669746341796c656572';
var INPUT_DATA_C_128 = '4449555520657669746341796c656572';

// Expected outputs for the scenario
var EXPECTED_DATA_NC_16 ='fed8';
var EXPECTED_DATA_C_16 ='fed8';
var EXPECTED_DATA_NC_128 ='7265656c794163746976652055554944';
var EXPECTED_DATA_C_128 = '7265656c794163746976652055554944'; 

describe('ble data uuid', function() {

  // Test the process function
  it('should parse BLE advertiser non-complete 16-bit UUIDs', function() {
    assert.equal(uuid.process(INPUT_DATA_NC_16), EXPECTED_DATA_NC_16);
  });

  it('should parse BLE advertiser complete 16-bit UUIDs', function() {
    assert.deepEqual(uuid.process(INPUT_DATA_C_16), EXPECTED_DATA_C_16);
  });

  it('should parse BLE advertiser non-complete 128-bit UUIDs.', function() {
    assert.deepEqual(uuid.process(INPUT_DATA_NC_128), EXPECTED_DATA_NC_128);
  });

  it('should parse BLE advertiser complete 128-bit UUIDs', function() {
    assert.deepEqual(uuid.process(INPUT_DATA_C_128), EXPECTED_DATA_C_128);
  });
});
