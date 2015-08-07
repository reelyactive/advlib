/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var gattservices = require("../../../../../../lib/ble/data/gatt/services/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_COMPANY_NAME = {
  serviceData: { 
    uuid: "fedd",
    data: "00f2027265656c7961637469766507" 
  }
};
var INPUT_DATA_GOOGLE = {
  serviceData: { 
    uuid: "fed8",
    data: "00f2027265656c7961637469766507" 
  }
};
var INPUT_DATA_STANDARD_SERVICE_DEVICE_INFORMATION = {
  serviceData: { 
    uuid: "180a",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA_COMPANY_NAME =  {
  serviceData: {
    uuid: "fedd",
    data: "00f2027265656c7961637469766507",
    companyName: "Jawbone",
  }
}
var EXPECTED_DATA_GOOGLE =  {
  serviceData: {
    uuid: "fed8",
    data: "00f2027265656c7961637469766507",
    companyName: "Google",
    uriBeacon: {
      invisibleHint: false,
      txPower: "-14dBm",
      url: "http://reelyactive.com"
    }
  }
}
var EXPECTED_DATA_STANDARD_SERVICE_DEVICE_INFORMATION = {
  serviceData: {
    uuid: "180a",
    data: "1204eb150000",
    specificationName: "Device Information"
  }
};

describe('ble data', function() {

  // Test the process function
  it('should convert a hexadecimal advertiser data companyName UUID to JSON', function() {
    var advertiserData = INPUT_DATA_COMPANY_NAME;
    gattservices.process(advertiserData);
    assert.deepEqual(advertiserData,EXPECTED_DATA_COMPANY_NAME);
  });
  it('should convert a hexadecimal advertiser data Google UUID to JSON', function() {
    var advertiserData = INPUT_DATA_GOOGLE;
    gattservices.process(advertiserData);
    assert.deepEqual(advertiserData,EXPECTED_DATA_GOOGLE);
  });
  it('should convert a hexadecimal advertiser data Standard Service UUID to JSON', function() {
    var advertiserData = INPUT_DATA_STANDARD_SERVICE_DEVICE_INFORMATION;
    gattservices.process(advertiserData);
    assert.deepEqual(advertiserData,EXPECTED_DATA_STANDARD_SERVICE_DEVICE_INFORMATION);
  });
});