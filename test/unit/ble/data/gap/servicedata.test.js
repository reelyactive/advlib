
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
var INPUT_DATA = '09160a181204eb150000';
var INPUT_DATA_COMPANY_NAME = '1216d8fe00f2027265656c7961637469766507';

// Expected outputs for the scenario
var EXPECTED_DATA = {
  uuid: "180a",
  data: "1204eb150000",
};
var EXPECTED_DATA_COMPANY_NAME = {
  uuid: "fed8",
  data: "00f2027265656c7961637469766507",
  companyName: "Google"
}

describe('ble data servicedata', function() {

  // Test the process function
  it('should parse BLE advertiser data service data', function() {
    servicedata.process(INPUT_DATA, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.serviceData, EXPECTED_DATA);
  });
  it('should parse BLE advertiser data service data with companyName', function() {
    servicedata.process(INPUT_DATA, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.serviceData, EXPECTED_DATA);
  });
});
