/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var immediatealert = require("../../../../../../../lib/ble/data/gatt/"+
                                        "services/standard/immediatealert.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1802",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1802",
    data: "1204eb150000",
    specificationName: "Immediate Alert"
  }
};

describe('ble data gatt standard immediatealert', function() {

  // Test the process function
  it('should parse BLE advertiser data immediatealert', function() {
    var advertiserData = INPUT_DATA;
    immediatealert.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});