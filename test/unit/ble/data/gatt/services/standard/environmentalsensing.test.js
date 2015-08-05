/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var environmentalsensing = require("../../../../../../../lib/ble/data/"+
                             "gatt/services/standard/environmentalsensing.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181a",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181a",
    data: "1204eb150000",
    standard: "Environmental Sensing"
  }
};

describe('ble data gatt standard environmentalsensing', function() {

  // Test the process function
  it('should parse BLE advertiser data environmentalsensing', function() {
    var advertiserData = INPUT_DATA;
    environmentalsensing.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});