/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../lib/ble/index.js");
var assert = require ('assert'); 

// Inputs for the scenario
var INPUT_DATA = '421655daba50e1fe0201050c097265656c79416374697665' ;

// Expected outputs for the scenario
var EXPECTED_DATA =  {
  type: 'ADVA-48',
  value: 'fee150bada55',
  advHeader: { 
    type: 'ADV_NONCONNECT_IND',
    length: 22,
    txAdd: 'random',
    rxAdd: 'public' 
  },
  advData: {
    flags: [ 'LE Limited Discoverable Mode', 'BR/EDR Not Supported' ],
      completeLocalName: 'reelyActive' 
  } 
}

describe('ble', function() {

  // Test the process function
  it('should convert a hexadecimal payload to a JSON packet', function() {
    assert.deepEqual(advlib.process(INPUT_DATA), EXPECTED_DATA);
  });
});