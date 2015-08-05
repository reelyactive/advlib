/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var google = 
  require("../../../../../../../lib/ble/data/gatt/services/members/google.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA_URIBEACON = {
  serviceData: { 
    uuid: "fed8",
    data: "00f2027265656c7961637469766507" 
  }
};
var INPUT_DATA_EDDYSTONE_UID = {
  serviceData: { 
    uuid: "feaa",
    data: "00128b0ca750095477cb3e77001122334455" 
  }
}; 
var INPUT_DATA_EDDYSTONE_URL = {
  serviceData: { 
    uuid: "feaa",
    data: "1012027265656c7961637469766507" 
  }
}; 
var INPUT_DATA_EDDYSTONE_TLM = {
  serviceData: { 
    uuid: "feaa",
    data: "2000000080000000000000000000" 
  }
}; 

// Expected outputs for the scenario
var EXPECTED_DATA_URIBEACON = {
  serviceData: {
    uuid: "fed8",
    data: "00f2027265656c7961637469766507",
    uriBeacon: {
      invisibleHint: false,
      txPower: "-14dBm",
      url: "http://reelyactive.com"
    }
  }
};
var EXPECTED_DATA_EDDYSTONE_UID = {
  serviceData: {
    uuid: "feaa",
    data: "00128b0ca750095477cb3e77001122334455",
    eddystone: {
      type: "UID",
      txPower: "18dBm",
      uid: {
        namespace: "8b0ca750095477cb3e77",
        instance: "001122334455"
      }
    }
  }
};
var EXPECTED_DATA_EDDYSTONE_URL = {
  serviceData: {
    uuid: "feaa",
    data: "1012027265656c7961637469766507",
    eddystone: {
      type: "URI",
      txPower: "18dBm",
      url: "http://reelyactive.com"
    }
  }
};
var EXPECTED_DATA_EDDYSTONE_TLM = {
  serviceData: {
    uuid: 'feaa',
    data: '2000000080000000000000000000',
    eddystone: {
      type: "TLM",
      version: "00",
      batteryVoltage: "0000",
      temperature: "8000",
      advertisingCount: "00000000",
      uptime: "00000000"
    }
  }
};

describe('ble data gatt service member google', function() {

  // Test the process function
  it('should parse BLE advertiser data UriBeacon', function() {
    var advertiserData = INPUT_DATA_URIBEACON;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_URIBEACON);
  });
  it('should parse BLE advertiser data Eddystone UID', function() {
    var advertiserData = INPUT_DATA_EDDYSTONE_UID;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_EDDYSTONE_UID);
  });
  it('should parse BLE advertiser data Eddystone URL', function() {
    var advertiserData = INPUT_DATA_EDDYSTONE_URL;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_EDDYSTONE_URL);
  });
  it('should parse BLE advertiser data Eddystone TLM', function() {
    var advertiserData = INPUT_DATA_EDDYSTONE_TLM;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_EDDYSTONE_TLM);
  });
});
