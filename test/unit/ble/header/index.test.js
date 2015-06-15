/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var advlib = require("../../../../lib/ble/header/index.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_ADDRESS_RANDOM  = 'c000';
var INPUT_DATA_ADDRESS_PUBLIC = '0000';
var INPUT_DATA_ADV_IND = '4000';
var INPUT_DATA_ADV_DIRECT_IND = '4100';
var INPUT_DATA_ADV_NONCONNECT_IND = '4200';
var INPUT_DATA_SCAN_REQ = '4300';
var INPUT_DATA_SCAN_RSP = '4400';
var INPUT_DATA_CONNECT_REQ = '4500';
var INPUT_DATA_ADV_DISCOVER_IND = '4600';
var INPUT_DATA_UNSPECIFIED_TYPE = '4700'
var INPUT_DATA_MAX_LENGTH = '401b';


// Expected outputs for the scenario
var EXPECTED_DATA_ADDRESS_RANDOM =  {
  txAdd: "random",
  rxAdd : "random",
  type: "ADV_IND",
  length: 0
}
var EXPECTED_DATA_ADDRESS_PUBLIC =  {
  txAdd: "public",
  rxAdd: "public",
  type: "ADV_IND",
  length: 0
}
var EXPECTED_DATA_ADV_IND = 'ADV_IND';
var EXPECTED_DATA_ADV_DIRECT_IND = 'ADV_DIRECT_IND';
var EXPECTED_DATA_ADV_NONCONNECT_IND_TYPE = "ADV_NONCONNECT_IND";
var EXPECTED_DATA_SCAN_REQ = 'SCAN_REQ';
var EXPECTED_DATA_SCAN_RSP = 'SCAN_RSP';
var EXPECTED_DATA_CONNECT_REQ = 'CONNECT_REQ';
var EXPECTED_DATA_ADV_DISCOVER_IND = 'ADV_DISCOVER_IND';
var EXPECTED_DATA_UNSPECIFIED_TYPE = 'UNRECOGNISED';
var EXPECTED_DATA_MAX_LENGTH_LENGTH = 27;

describe('ble header', function() {

  // Test the process function
  it('should recognize random txAdd and rxAdd', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADDRESS_RANDOM), 
                     EXPECTED_DATA_ADDRESS_RANDOM);
  });

  it('should recognize public txAdd and rxAdd', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADDRESS_PUBLIC),  
                                    EXPECTED_DATA_ADDRESS_PUBLIC);
  });

  it('should recognize a ADV_IND', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADV_IND).type, 
                                    EXPECTED_DATA_ADV_IND);
  });

  it('should recognize a ADV_DIRECT_IND', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADV_DIRECT_IND).type, 
                                    EXPECTED_DATA_ADV_DIRECT_IND);
  });

  it('should recognize a ADV_NONCONNECT_IND', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADV_NONCONNECT_IND).type, 
                                    EXPECTED_DATA_ADV_NONCONNECT_IND_TYPE);
  });

  it('should recognize a SCAN_REQ', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_SCAN_REQ).type, 
                                    EXPECTED_DATA_SCAN_REQ);
  });

  it('should recognize a SCAN_RSP', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_SCAN_RSP).type, 
                                    EXPECTED_DATA_SCAN_RSP);
  });

  it('should recognize a CONNECT_REQ', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_CONNECT_REQ).type, 
                                    EXPECTED_DATA_CONNECT_REQ);
  });

  it('should recognize a ADV_DISCOVER_IND', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_ADV_DISCOVER_IND).type, 
                                    EXPECTED_DATA_ADV_DISCOVER_IND);
  });

  it('should recognize a unspecified type', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_UNSPECIFIED_TYPE).type, 
                                    EXPECTED_DATA_UNSPECIFIED_TYPE);
  });
  
  it('should recognize a payload of max length', function() {
    assert.deepEqual(advlib.process(INPUT_DATA_MAX_LENGTH).length, 
                                    EXPECTED_DATA_MAX_LENGTH_LENGTH);
  });
});