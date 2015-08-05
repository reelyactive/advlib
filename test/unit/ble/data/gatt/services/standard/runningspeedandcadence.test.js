/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var runningspeedandcadence = require("../../../../../../../lib/ble/data/"+
                           "gatt/services/standard/runningspeedandcadence.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1814",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1814",
    data: "1204eb150000",
    specificationName: "Running Speed and Cadence"
  }
};

describe('ble data gatt standard runningspeedandcadence', function() {

  // Test the process function
  it('should parse BLE advertiser data runningspeedandcadence', function() {
    var advertiserData = INPUT_DATA;
    runningspeedandcadence.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});