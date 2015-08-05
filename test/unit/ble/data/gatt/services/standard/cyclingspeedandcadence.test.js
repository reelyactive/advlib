/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var cyclingspeedandcadence = require("../../../../../../../lib/ble/"+
                      "data/gatt/services/standard/cyclingspeedandcadence.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1816",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1816",
    data: "1204eb150000",
    standard: "Cycling Speed and Cadence"
  }
};

describe('ble data gatt standard cyclingspeedandcadence', function() {

  // Test the process function
  it('should parse BLE advertiser data cyclingspeedandcadence', function() {
    var advertiserData = INPUT_DATA;
    cyclingspeedandcadence.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});