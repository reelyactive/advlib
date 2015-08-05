/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var txpower = require("../../../../../../../lib/ble/data/gatt/"+
                                               "services/standard/txpower.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1804",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1804",
    data: "1204eb150000",
    standard: "Tx Power"
  }
};

describe('ble data gatt standard txpower', function() {

  // Test the process function
  it('should parse BLE advertiser data txpower', function() {
    var advertiserData = INPUT_DATA;
    txpower.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});