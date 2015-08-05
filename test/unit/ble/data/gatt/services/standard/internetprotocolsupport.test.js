/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var internetprotocolsupport = require("../../../../../../../lib/ble/data/"+
                          "gatt/services/standard/internetprotocolsupport.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1820",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1820",
    data: "1204eb150000",
    standard: "Internet Protocol Support"
  }
};

describe('ble data gatt standard internetprotocolsupport', function() {

  // Test the process function
  it('should parse BLE advertiser data internetprotocolsupport', function() {
    var advertiserData = INPUT_DATA;
    internetprotocolsupport.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});