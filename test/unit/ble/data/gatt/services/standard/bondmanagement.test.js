/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var bondmanagement = require("../../../../../../../lib/ble/data/gatt/"+
                                        "services/standard/bondmanagement.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181e",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181e",
    data: "1204eb150000",
    specificationName: "Bond Management"
  }
};

describe('ble data gatt standard bondmanagement', function() {

  // Test the process function
  it('should parse BLE advertiser data bondmanagement', function() {
    var advertiserData = INPUT_DATA;
    bondmanagement.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});