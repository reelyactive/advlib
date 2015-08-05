/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var alertnotificationservice = require("../../../../../../../lib/ble/data/"+
                         "gatt/services/standard/alertnotificationservice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1811",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1811",
    data: "1204eb150000",
    standard: "Alert Notification Service"
  }
};

describe('ble data gatt standard alertnotificationservice', function() {

  // Test the process function
  it('should parse BLE advertiser data alertnotificationservice', function() {
    var advertiserData = INPUT_DATA;
    alertnotificationservice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});