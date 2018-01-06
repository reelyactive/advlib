/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */

var txpower = require("../../../../../lib/ble/data/gap/txpower.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA = '7f';

// Expected outputs for the scenario
var EXPECTED_DATA = '127dBm';

describe('ble data txpower', function() {

  // Test the process function
  it('should parse BLE advertiser TX power', function() {
    assert.deepEqual(txpower.process(INPUT_DATA), EXPECTED_DATA);
  });

});
