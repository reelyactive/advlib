/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var phonealertstatusservice = require("../../../../../../../lib/ble/data/"+
                          "gatt/services/standard/phonealertstatusservice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "180e",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "180e",
    data: "1204eb150000",
    specificationName: "Phone Alert Status Service"
  }
};

describe('ble data gatt standard phonealertstatusservice', function() {

  // Test the process function
  it('should parse BLE advertiser data phonealertstatusservice', function() {
    var advertiserData = INPUT_DATA;
    phonealertstatusservice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});