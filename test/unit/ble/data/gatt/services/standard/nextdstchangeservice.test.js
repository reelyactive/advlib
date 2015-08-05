/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var nextdstchangeservice = require("../../../../../../../lib/ble/data/"+
                             "gatt/services/standard/nextdstchangeservice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1807",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1807",
    data: "1204eb150000",
    standard: "Next DST Change Service"
  }
};

describe('ble data gatt standard nextdstchangeservice', function() {

  // Test the process function
  it('should parse BLE advertiser data nextdstchangeservice', function() {
    var advertiserData = INPUT_DATA;
    nextdstchangeservice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});