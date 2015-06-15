/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var genericdata = require("../../../../../lib/ble/data/gap/genericdata.js").process;
var assert = require ('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};
var ADTYPE = 0;

// Inputs for the scenario
var INPUT_DATA = '03ff4c00';

// Expected outputs for the scenario
var EXPECTED_DATA ='4c00';


describe('ble data generic data', function() {

  // Test the process function
  it('should parse genericdata', function() {
  	genericdata(INPUT_DATA, CURSOR, ADVERTISER_DATA, ADTYPE);
    assert.deepEqual(ADVERTISER_DATA[ADTYPE], EXPECTED_DATA);
  });
  
});
