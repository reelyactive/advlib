/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var bodycomposition = require("../../../../../../../lib/ble/data/gatt/"+
                                       "services/standard/bodycomposition.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181b",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181b",
    data: "1204eb150000",
    standard: "Body Composition"
  }
};

describe('ble data gatt standard bodycomposition', function() {

  // Test the process function
  it('should parse BLE advertiser data bodycomposition', function() {
    var advertiserData = INPUT_DATA;
    bodycomposition.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});