/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var solicitation = require("../../../../../lib/ble/data/gap/solicitation.js");
var assert = require('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};
  
// Inputs for the scenario
var INPUT_DATA_16_BIT_UUID = '0314d8fe';
var INPUT_DATA__128_BIT_UUID = '261516074449555520657669746341796c656572';

// Expected outputs for the scenario
var EXPECTED_DATA_16_BIT_UUID ='fed8';
var EXPECTED_DATA_128_BIT_UUID = '7265656c7941637469766520555549440716';

describe('ble data solicitation', function() {

  // Test the process function
  it('should parse BLE advertiser data service solicitation 16-bit UUIDs',
  	 function() {
    solicitation.solicitation16BitUUIDs(INPUT_DATA_16_BIT_UUID, CURSOR,
    								    ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.solicitation16BitUUIDs, 
    				 EXPECTED_DATA_16_BIT_UUID);
  });
  
  it('should parse BLE advertiser data service solicitation 128-bit UUIDs', 
  	 function() {
    solicitation.solicitation128BitUUIDs(INPUT_DATA__128_BIT_UUID, CURSOR, 
    									 ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.solicitation128BitUUIDs, 
    	 			 EXPECTED_DATA_128_BIT_UUID);
  });
});
