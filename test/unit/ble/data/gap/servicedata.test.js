
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

// Expected outputs for the scenario
var EXPECTED_DATA ={
  uuid: "180a",
  data: "1204eb150000",
};


describe('ble data servicedata', function() {

  // Test the process function
  it('should parse BLE advertiser data service data', function() {
    servicedata.process(INPUT_DATA, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.serviceData, EXPECTED_DATA);
  });
});
