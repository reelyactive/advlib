/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../../lib/ble/data/index.js");
var assert = require ('assert'); 

// Inputs for the scenario
var INPUT_DATA = '0201050c097265656c794163746976650100' ;

// Expected outputs for the scenario
var EXPECTED_DATA =  {
  flags: [ 'LE Limited Discoverable Mode', 'BR/EDR Not Supported' ],
    completeLocalName: 'reelyActive' 
}

describe('ble data', function() {

  // Test the process function
  it('should convert a hexadecimal advertiser data to JSON', function() {
    assert.deepEqual(advlib.process(INPUT_DATA), EXPECTED_DATA);
  });
});