/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var automationio = require("../../../../../../../lib/ble/data/gatt/"+
                                          "services/standard/automationio.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1815",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1815",
    data: "1204eb150000",
    standard: "Automation IO"
  }
};

describe('ble data gatt standard automationio', function() {

  // Test the process function
  it('should parse BLE advertiser data automationio', function() {
    var advertiserData = INPUT_DATA;
    automationio.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  
});