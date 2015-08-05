/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var servicedata = require("../../../../../lib/ble/data/gap/servicedata.js");
var assert = require('assert'); 


// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};

// Inputs for the scenario
var INPUT_DATA = '09164c001204eb150000';
var INPUT_DATA_COMPANY_NAME = '1216d8fe00f2027265656c7961637469766507';

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "004c",
    data: "1204eb150000"
  }
};
var EXPECTED_DATA_COMPANY_NAME = {
  serviceData: {
    uuid: "fed8",
    data: "00f2027265656c7961637469766507",
    companyName: "Google​",
    uriBeacon: {
      invisibleHint: false,
      txPower: "-14dBm",
      url: "http://reelyactive.com"
    }
  }
};


describe('ble data servicedata', function() {

  // Test the process function
  it('should parse BLE advertiser data service data', function() {
    var advertiserData = {};
    servicedata.process(INPUT_DATA, CURSOR, advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
  it('should parse BLE advertiser data service data with companyName',
     function() {
    var advertiserData = {};
    servicedata.process(INPUT_DATA_COMPANY_NAME, CURSOR, advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA_COMPANY_NAME);
  });
});
