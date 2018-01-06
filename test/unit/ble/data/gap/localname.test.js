/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */

var localname = require("../../../../../lib/ble/data/gap/localname.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_LOCAL_NAME = '7265656c79416374697665'

// Expected outputs for the scenario
var EXPECTED_DATA_LOCAL_NAME ='reelyActive';

describe('ble data localname', function() {

  // Test the process function
  it('should convert ble advertiser data to a local name', function() {
    assert.deepEqual(localname.process(INPUT_DATA_LOCAL_NAME), 
                     EXPECTED_DATA_LOCAL_NAME);
  });

});

