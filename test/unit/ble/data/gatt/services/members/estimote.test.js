/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


var estimote = 
  require("../../../../../../../lib/ble/data/gatt/services/members/estimote.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA_LOCATION = {
  serviceData: { 
    uuid: "fe9a",
    data: "00ceaac4fd251b1e35f267cd2ed3cf850b614440" 
  }
};
var INPUT_DATA_TELEMETRY_00 = {
  serviceData: { 
    uuid: "fe9a",
    data: "12ceaac4fd251b1e350020c9010196f002" 
  }
}; 
var INPUT_DATA_TELEMETRY_01 = {
  serviceData: { 
    uuid: "fe9a",
    data: "12ceaac4fd251b1e350100000000ad704d205e60" 
  }
}; 


// Expected outputs for the scenario
var EXPECTED_DATA_LOCATION = {
  serviceData: {
    uuid: "fe9a",
    data: "00ceaac4fd251b1e35f267cd2ed3cf850b614440",
    estimote: {
      type: "location",
      id: "ceaac4fd251b1e35",
      payload: "f267cd2ed3cf850b614440"
    }
  }
};
var EXPECTED_DATA_TELEMETRY_00 = {
  serviceData: {
    uuid: "fe9a",
    data: "12ceaac4fd251b1e350020c9010196f002",
    estimote: {
      type: "telemetry",
      id: "ceaac4fd251b1e35",
      subtype: "00",
      accelerationX: 0.5,
      accelerationY: -0.859375,
      accelerationZ: 0.015625,
      statusBytes: [ "01", "96", "f0", "02" ]
    }
  }
};
var EXPECTED_DATA_TELEMETRY_01 = {
  serviceData: {
    uuid: "fe9a",
    data: "12ceaac4fd251b1e350100000000ad704d205e60",
    estimote: {
      type: "telemetry",
      id: "ceaac4fd251b1e35",
      subtype: "01",
      payload: "00000000ad704d205e60"
    }
  }
};

describe('ble data gatt service member estimote', function() {

  // Test the process function
  it('should parse BLE advertiser data Estimote location', function() {
    var advertiserData = INPUT_DATA_LOCATION;
    estimote.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_LOCATION);
  });
  it('should parse BLE advertiser data Estimote telemetry 00', function() {
    var advertiserData = INPUT_DATA_TELEMETRY_00;
    estimote.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_TELEMETRY_00);
  });
  it('should parse BLE advertiser data Estimote telemetry 01', function() {
    var advertiserData = INPUT_DATA_TELEMETRY_01;
    estimote.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_TELEMETRY_01);
  });
});
