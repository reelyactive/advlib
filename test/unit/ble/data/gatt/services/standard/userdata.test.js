/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var userdata = require("../../../../../../../lib/ble/data/gatt/services/"+
                                                       "standard/userdata.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181c",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181c",
    data: "1204eb150000",
    standard: "User Data"
  }
};

describe('ble data gatt standard userdata', function() {

  // Test the process function
  it('should parse BLE advertiser data userdata', function() {
    var advertiserData = INPUT_DATA;
    userdata.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});