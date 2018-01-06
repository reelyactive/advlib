/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */

var servicedata = require("../../../../../lib/ble/data/gap/servicedata.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA = '4c001204eb150000';
var INPUT_DATA_COMPANY_NAME = 'd8fe00f2027265656c7961637469766507';

// Expected outputs for the scenario
var EXPECTED_DATA = {
  uuid: "004c",
  data: "1204eb150000"
};
var EXPECTED_DATA_COMPANY_NAME = {
  uuid: "fed8",
  data: "00f2027265656c7961637469766507",
  companyName: "Google",
  uriBeacon: {
    invisibleHint: false,
    txPower: "-14dBm",
    url: "http://reelyactive.com"
  }
};


describe('ble data servicedata', function() {

  // Test the process function
  it('should parse BLE advertiser data service data', function() {
    assert.deepEqual(servicedata.process(INPUT_DATA), EXPECTED_DATA);
  });
  it('should parse BLE advertiser data service data with companyName',
     function() {
    assert.deepEqual(servicedata.process(INPUT_DATA_COMPANY_NAME),
                     EXPECTED_DATA_COMPANY_NAME);
  });
});
