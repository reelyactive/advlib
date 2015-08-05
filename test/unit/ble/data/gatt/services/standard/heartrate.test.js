/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var heartrate = require("../../../../../../../lib/ble/data/gatt/services/"+
                                                      "standard/heartrate.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "180d",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "180d",
    data: "1204eb150000",
    specificationName: "Heart Rate"
  }
};

describe('ble data gatt standard heartrate', function() {

  // Test the process function
  it('should parse BLE advertiser data heartrate', function() {
    var advertiserData = INPUT_DATA;
    heartrate.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});