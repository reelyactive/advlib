/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var flags = require("../../../../../lib/ble/data/gap/flags.js");
var assert = require('assert'); 

// Inputs for the scenario
var INPUT_DATA_LE_LIMITED = '01';
var INPUT_DATA_LE_GENERAL = '02';
var INPUT_DATA_BR_OR_EDR_NOT_SUPPORTED = '04';
var INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER = '08';
var INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST = '10';

// Expected outputs for the scenario
var EXPECTED_DATA_LE_LIMITED = [ 'LE Limited Discoverable Mode' ];
var EXPECTED_DATA_LE_GENERAL = [ 'LE General Discoverable Mode' ];
var EXPECTED_DATA_BR_OR_EDR_NOT_SUPPORTED = [ 'BR/EDR Not Supported' ];
var EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER = 
          [ 'Simultaneous LE and BR/EDR to Same Device Capable (Controller)' ];
var EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST = 
                [ 'Simultaneous LE and BR/EDR to Same Device Capable (Host)' ];

describe('ble data flags', function() {

  // Test the process function
  it('should convert a hexadecimal payload to LE Limited', function() {
    assert.deepEqual(flags.process(INPUT_DATA_LE_LIMITED),
                     EXPECTED_DATA_LE_LIMITED);
  });

  it('should convert a hexadecimal payload to LE General', function() {
    assert.deepEqual(flags.process(INPUT_DATA_LE_GENERAL),
                     EXPECTED_DATA_LE_GENERAL);
  });

  it('should convert a hexadecimal payload to BR/EDR Not Supported',
     function() {
    assert.deepEqual(flags.process(INPUT_DATA_BR_OR_EDR_NOT_SUPPORTED),
                     EXPECTED_DATA_BR_OR_EDR_NOT_SUPPORTED);
  });

  it('should convert a hexadecimal payload to Simultaneous LE and BR/EDR to \
     Same Device Capable (Controller', function() {
    assert.deepEqual(flags.process(
                INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER), 
                EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER);
  });

  it('should convert a hexadecimal payload to Simultaneous LE and BR/EDR to \
     Same Device Capable (Host)', function() {
    assert.deepEqual(flags.process(
                     INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST),
                     EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST);
  });
});
