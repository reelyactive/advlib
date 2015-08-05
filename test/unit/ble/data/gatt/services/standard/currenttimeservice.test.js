/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var currenttimeservice = require("../../../../../../../lib/ble/data/"+
                               "gatt/services/standard/currenttimeservice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1805",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1805",
    data: "1204eb150000",
    specificationName: "Current Time Service"
  }
};

describe('ble data gatt standard currenttimeservice', function() {

  // Test the process function
  it('should parse BLE advertiser data currenttimeservice', function() {
    var advertiserData = INPUT_DATA;
    currenttimeservice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});