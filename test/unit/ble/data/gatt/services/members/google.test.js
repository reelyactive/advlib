/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var google = 
  require("../../../../../../../lib/ble/data/gatt/services/members/google.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA_URIBEACON = {
    serviceData: { uuid: "fed8",
                   data: "00f2027265656c7961637469766507" }
};
var INPUT_DATA_EDDYSTONE_UID = {
    serviceData: { uuid: "feaa",
                   data: "2116aafe00128b0ca750095477cb3e77001122334455" }
}; 
var INPUT_DATA_EDDYSTONE_URI = {
    serviceData: { uuid: "feaa",
                   data: "0716aafe10120000" }
}; 
var INPUT_DATA_EDDYSTONE_TLM = {
    serviceData: { uuid: "feaa",
                   data: "1816aafe2000000080000000000000000000" }
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
var EXPECTED_DATA_EDDYSTONE_URI = {
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
var EXPECTED_DATA_EDDYSTONE_TLM = {
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
  it('should parse BLE advertiser data Eddystone URI', function() {
    var advertiserData = INPUT_DATA_EDDYSTONE_URI;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_EDDYSTONE_URI);
  });
  it('should parse BLE advertiser data Eddystone TLM', function() {
    var advertiserData = INPUT_DATA_EDDYSTONE_TLM;
    google.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_EDDYSTONE_TLM);
  });
});
