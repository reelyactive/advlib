/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var healththermometer = require("../../../../../../../lib/ble/data/gatt"+
                                    "/services/standard/healththermometer.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1809",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1809",
    data: "1204eb150000",
    specificationName: "Health Thermometer"
  }
};

describe('ble data gatt standard healththermometer', function() {

  // Test the process function
  it('should parse BLE advertiser data healththermometer', function() {
    var advertiserData = INPUT_DATA;
    healththermometer.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});