/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../../lib/ble/address/index.js");
var assert = require('assert'); 

// Inputs for the scenario

var INPUT_DATA_VALID = '55daba50e1fe';
var INPUT_DATA_TOO_SHORT = '55' ;
var INPUT_DATA_TOO_LONG = '55daba50e1fe232fd' ;
var INPUT_DATA_NOT_HEX = 'ZXZXZXZXZXZX' ;
var INPUT_DATA_UPPER_CASE_LETTERS = '55DABA50E1FE' ;

// Expected outputs for the scenario
var EXPECTED_DATA_VALID =  {
  type: 'ADVA-48',
  value: 'fee150bada55'
}

describe('ble address', function() {

  // Test the process function
  it('should convert a valid hexadecimal address to JSON', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_VALID), EXPECTED_DATA_VALID);
  });

  it('should not convert a short hexadecimal address to JSON', function() {
	    assert.notDeepEqual(advlib.process(INPUT_DATA_TOO_SHORT), 
                                         EXPECTED_DATA_VALID);
  });

  it('should convert a long hexadecimal address to JSON', function() {
	    assert.deepEqual(advlib.process(INPUT_DATA_TOO_LONG), 
                                      EXPECTED_DATA_VALID);
  });

  it('should not convert a non hexadecimal address to JSON', function() {
	    assert.notDeepEqual(advlib.process(INPUT_DATA_NOT_HEX), 
                                         EXPECTED_DATA_VALID);
  });
  
  it('should not convert a hexadecimal address with upper case letters to JSON',
     function() {
	    assert.notDeepEqual(advlib.process(INPUT_DATA_UPPER_CASE_LETTERS), 
                                         EXPECTED_DATA_VALID);
  });
});