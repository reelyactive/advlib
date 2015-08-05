/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var humaninterfacedevice = require("../../../../../../../lib/ble/data/"+
                             "gatt/services/standard/humaninterfacedevice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1812",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1812",
    data: "1204eb150000",
    specificationName: "Human Interface Device"
  }
};

describe('ble data gatt standard humaninterfacedevice', function() {

  // Test the process function
  it('should parse BLE advertiser data humaninterfacedevice', function() {
    var advertiserData = INPUT_DATA;
    humaninterfacedevice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});