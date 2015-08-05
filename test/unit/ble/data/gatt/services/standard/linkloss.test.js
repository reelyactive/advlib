/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var linkloss = require("../../../../../../../lib/ble/data/gatt/services/"+
                                                       "standard/linkloss.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1803",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1803",
    data: "1204eb150000",
    standard: "Link Loss"
  }
};

describe('ble data gatt standard linkloss', function() {

  // Test the process function
  it('should parse BLE advertiser data linkloss', function() {
    var advertiserData = INPUT_DATA;
    linkloss.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});