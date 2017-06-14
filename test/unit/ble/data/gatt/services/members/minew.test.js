/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


var minew = 
  require("../../../../../../../lib/ble/data/gatt/services/members/minew.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA_A1_1 = {
  serviceData: { 
    uuid: "ffe1",
    data: "a1016416dc27fd0c04a03f23ac" 
  }
};
var INPUT_DATA_A1_2 = {
  serviceData: { 
    uuid: "ffe1",
    data: "a1026401ff04a03f23ac" 
  }
};
var INPUT_DATA_A1_3 = {
  serviceData: { 
    uuid: "ffe1",
    data: "a1036400d70087fffe5705a03f23ac" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA_A1_1 = {
  serviceData: {
    uuid: "ffe1",
    data: "a1016416dc27fd0c04a03f23ac",
    minew: {
      frameType: "a1",
      productModel: 1,
      batteryPercent: 100,
      temperature: 22.859375,
      humidity: 39.98828125,
      macAddress: "ac:23:3f:a0:04:0c"
    }
  }
};
var EXPECTED_DATA_A1_2 = {
  serviceData: {
    uuid: "ffe1",
    data: "a1026401ff04a03f23ac",
    minew: {
      frameType: "a1",
      productModel: 2,
      batteryPercent: 100,
      visibleLight: true,
      macAddress: "ac:23:3f:a0:04:ff"
    }
  }
};
var EXPECTED_DATA_A1_3 = {
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
  it('should parse BLE advertiser data Minew frame A1 model 1', function() {
    var advertiserData = INPUT_DATA_A1_1;
    minew.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_A1_1);
  });
  it('should parse BLE advertiser data Minew frame A1 model 2', function() {
    var advertiserData = INPUT_DATA_A1_2;
    minew.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_A1_2);
  });
  it('should parse BLE advertiser data Minew frame A1 model 3', function() {
    var advertiserData = INPUT_DATA_A1_3;
    minew.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_A1_3);
  });
});
