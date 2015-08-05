/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var cyclingpower = require("../../../../../../../lib/ble/data/gatt/"+
                                          "services/standard/cyclingpower.js"); 
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1818",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1818",
    data: "1204eb150000",
    standard: "Cycling Power"
  }
};

describe('ble data gatt standard cyclingpower', function() {

  // Test the process function
  it('should parse BLE advertiser data cyclingpower', function() {
    var advertiserData = INPUT_DATA;
    cyclingpower.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});