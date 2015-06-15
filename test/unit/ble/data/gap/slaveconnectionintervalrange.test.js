/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var slaveconnectionintervalrange = 
	require("../../../../../lib/ble/data/gap/slaveconnectionintervalrange.js");
var assert = require('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};

// Inputs for the scenario
var INPUT_DATA = '061200060c80';

// Expected outputs for the scenario
var EXPECTED_DATA ='00060c80';


describe('ble data slaveconnectionintervalrange', function() {

  // Test the process function
  it('should parse BLE advertiser data slave connection interval range ',
  	 function() {
    slaveconnectionintervalrange.process(INPUT_DATA, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.slaveConnectionIntervalRange, 
    				 EXPECTED_DATA);
  });
});
