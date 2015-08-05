/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var glucose = require("../../../../../../../lib/ble/data/gatt/services/"+
                                                        "standard/glucose.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1808",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1808",
    data: "1204eb150000",
    standard: "Glucose"
  }
};

describe('ble data gatt standard glucose', function() {

  // Test the process function
  it('should parse BLE advertiser data glucose', function() {
    var advertiserData = INPUT_DATA;
    glucose.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});