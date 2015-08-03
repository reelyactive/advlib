 /**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var google = require("../../../../../../../../lib/ble/data/gatt/services/members/google/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_UID = { serviceData: { uuid: "feaa", data: "2116aafe00128b0ca750095477cb3e77001122334455" } }; 
var INPUT_DATA_URI = { serviceData: { uuid: "feaa", data: "0716aafe10120000" } }; 
var INPUT_DATA_TLM = { serviceData: { uuid: "feaa", data: "1816aafe2000000080000000000000000000" } }; 

// Expected outputs for the scenario
var EXPECTED_DATA_UID = {
  serviceData: {
    uuid: "feaa",
    data: "2116aafe00128b0ca750095477cb3e77001122334455",
    eddystone: {
      dataType: "16",
      uuid: "aa", 
      frameType: "00",
      uid: {
  	    rangingData: "12",
  	    namespace: "8b0ca750095477cb3e77",
  	    instance: "001122334455"
      }
    }
  }
};
var EXPECTED_DATA_URI = {
  serviceData: {
    uuid: "feaa",
    data: "0716aafe10120000",
    eddystone: {
      dataType: "16",
      uuid: "aa", 
      frameType: "10",
      uri: {
  	    txPower: "12",
  	    urlScheme: "00",
  	    encodedUrl: "00"
  	  }
    }
  }
};
var EXPECTED_DATA_TLM = {
  serviceData: {
    uuid: 'feaa',
    data: '1816aafe2000000080000000000000000000',
    eddystone: {
      dataType: "16",
      uuid: "aa", 
      frameType: "20",
      tlm: {
  	    tlmVersion: "00",
  	    vBatt: "0000",
  	    temp: "8000",
  	    advCnt: "00000000",
  	    secCnt: "00000000"
  	  }
    }
  }
};

describe('ble data gatt service member google', function() {

  // Test the process function
  it('should parse BLE advertiser data Eddystone UID', function() {
    google.process(INPUT_DATA_UID);
    assert.deepEqual(INPUT_DATA_UID, EXPECTED_DATA_UID);
  });
  it('should parse BLE advertiser data Eddystone URI', function() {
    google.process(INPUT_DATA_URI);
    assert.deepEqual(INPUT_DATA_URI, EXPECTED_DATA_URI);
  });
  it('should parse BLE advertiser data Eddystone TLM', function() {
    google.process(INPUT_DATA_TLM);
    assert.deepEqual(INPUT_DATA_TLM, EXPECTED_DATA_TLM);
  });
});
