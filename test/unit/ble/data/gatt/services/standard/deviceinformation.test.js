/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var deviceinformation = require("../../../../../../../lib/ble/"+
                           "data/gatt/services/standard/deviceinformation.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "180a",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "180a",
    data: "1204eb150000",
    standard: "Device Information"
  }
};

describe('ble data gatt standard deviceinformation', function() {

  // Test the process function
  it('should parse BLE advertiser data deviceinformation', function() {
    var advertiserData = INPUT_DATA;
    deviceinformation.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});