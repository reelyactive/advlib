/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


var minew = 
  require("../../../../../../../lib/ble/data/gatt/services/members/minew.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA_A1 = {
  serviceData: { 
    uuid: "ffe1",
    data: "a1036400d70087fffe5705a03f23ac" 
  }
};


// Expected outputs for the scenario
var EXPECTED_DATA_A1 = {
  serviceData: {
    uuid: "ffe1",
    data: "a1036400d70087fffe5705a03f23ac",
    minew: {
      frameType: "a1",
      productModel: 3,
      batteryPercent: 100,
      accelerationX: 0.83984375,
      accelerationY: 0.52734375,
      accelerationZ: -0.0078125,
      macAddress: "ac:23:3f:a0:05:57"
    }
  }
};


describe('ble data gatt service member minew', function() {

  // Test the process function
  it('should parse BLE advertiser data Minew frame A1', function() {
    var advertiserData = INPUT_DATA_A1;
    minew.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_A1);
  });
});
