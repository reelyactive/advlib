/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var indoorpositioning = require("../../../../../../../lib/ble/data/gatt/"+
                                     "services/standard/indoorpositioning.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1821",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1821",
    data: "1204eb150000",
    standard: "Indoor Positioning"
  }
};

describe('ble data gatt standard indoorpositioning', function() {

  // Test the process function
  it('should parse BLE advertiser data indoorpositioning', function() {
    var advertiserData = INPUT_DATA;
    indoorpositioning.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});