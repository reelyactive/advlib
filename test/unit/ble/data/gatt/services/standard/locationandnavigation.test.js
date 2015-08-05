/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var locationandnavigation = require("../../../../../../../lib/ble/data/"+
                            "gatt/services/standard/locationandnavigation.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1819",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1819",
    data: "1204eb150000",
    specificationName: "Location and Navigation"
  }
};

describe('ble data gatt standard locationandnavigation', function() {

  // Test the process function
  it('should parse BLE advertiser data locationandnavigation', function() {
    var advertiserData = INPUT_DATA;
    locationandnavigation.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});