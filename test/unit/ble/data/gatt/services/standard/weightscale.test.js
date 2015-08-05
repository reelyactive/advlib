/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var weightscale = require("../../../../../../../lib/ble/data/gatt/"+
                                           "services/standard/weightscale.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181d",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181d",
    data: "1204eb150000",
    specificationName: "Weight Scale"
  }
};

describe('ble data gatt standard weightscale', function() {

  // Test the process function
  it('should parse BLE advertiser data weightscale', function() {
    var advertiserData = INPUT_DATA;
    weightscale.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});