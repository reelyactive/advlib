/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var localname = require("../../../../../lib/ble/data/gap/localname.js");
var assert = require ('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};

// Inputs for the scenario
var INPUT_DATA_SHORTENED_LOCAL_NAME = '06087265656c79';
var INPUT_DATA_COMPLETE_LOCAL_NAME = '12097265656c79416374697665'

// Expected outputs for the scenario
var EXPECTED_DATA_SHORTENED_LOCAL_NAME ='reely';
var EXPECTED_DATA_COMPLETE_LOCAL_NAME ='reelyActive';

describe('ble data localname', function() {

  // Test the process function
  it('should convert ble advertiser data to a shortened local name', function() {
  	localname.shortenedLocalName(INPUT_DATA_SHORTENED_LOCAL_NAME, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.shortenedLocalName, EXPECTED_DATA_SHORTENED_LOCAL_NAME);
  });

  it('should convert ble advertiser data to a complete local name', function() {
  	localname.completeLocalName(INPUT_DATA_COMPLETE_LOCAL_NAME, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.completeLocalName, EXPECTED_DATA_COMPLETE_LOCAL_NAME);
  });
});

