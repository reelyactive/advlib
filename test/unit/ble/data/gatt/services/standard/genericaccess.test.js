/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var genericaccess = require("../../../../../../../lib/ble/data/"+
                                    "gatt/services/standard/genericaccess.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1800",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1800",
    data: "1204eb150000",
    specificationName: "Generic Access"
  }
};

describe('ble data gatt standard genericaccess', function() {

  // Test the process function
  it('should parse BLE advertiser data genericaccess', function() {
    var advertiserData = INPUT_DATA;
    genericaccess.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});