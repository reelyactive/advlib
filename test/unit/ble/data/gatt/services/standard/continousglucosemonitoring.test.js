/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var continousglucosemonitoring = require("../../../../../../../lib/ble"+
                 "/data/gatt/services/standard/continousglucosemonitoring.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "181f",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "181f",
    data: "1204eb150000",
    standard: "Continuous Glucose Monitoring"
  }
};

describe('ble data gatt standard continousglucosemonitoring', function() {

  // Test the process function
  it('should parse BLE advertiser data continousglucosemonitoring', function() {
    var advertiserData = INPUT_DATA;
    continousglucosemonitoring.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});