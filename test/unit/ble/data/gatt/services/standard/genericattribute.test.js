/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var genericattribute = require("../../../../../../../lib/ble/data/"+
                                 "gatt/services/standard/genericattribute.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1801",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1801",
    data: "1204eb150000",
    standard: "Generic Attribute"
  }
};

describe('ble data gatt standard genericattribute', function() {

  // Test the process function
  it('should parse BLE advertiser data genericattribute', function() {
    var advertiserData = INPUT_DATA;
    genericattribute.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});