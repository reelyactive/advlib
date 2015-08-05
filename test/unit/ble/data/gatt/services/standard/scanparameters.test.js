/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var scanparameters = require("../../../../../../../lib/ble/data/gatt/"+
                                        "services/standard/scanparameters.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1813",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1813",
    data: "1204eb150000",
    standard: "Scan Parameters"
  }
};

describe('ble data gatt standard scanparameters', function() {

  // Test the process function
  it('should parse BLE advertiser data scanparameters', function() {
    var advertiserData = INPUT_DATA;
    scanparameters.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});