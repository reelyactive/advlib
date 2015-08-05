/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pulseoximeter = require("../../../../../../../lib/ble/data/gatt/"+
                                         "services/standard/pulseoximeter.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1822",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1822",
    data: "1204eb150000",
    standard: "Pulse Oximeter"
  }
};

describe('ble data gatt standard pulseoximeter', function() {

  // Test the process function
  it('should parse BLE advertiser data pulseoximeter', function() {
    var advertiserData = INPUT_DATA;
    pulseoximeter.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});