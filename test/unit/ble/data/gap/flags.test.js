/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var flags = require("../../../../../lib/ble/data/gap/flags.js");
var assert = require ('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};

// Inputs for the scenario
var INPUT_DATA_LE_LIMITED = '020101';
var INPUT_DATA_LE_GENERAL = '020102';
var INPUT_DATA_BR_OR_EDR_NOT_SUPPORTED = '020104';
var INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER = '020108';
var INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST = '020110';

// Expected outputs for the scenario
var EXPECTED_DATA_LE_LIMITED = 'LE Limited Discoverable Mode';
var EXPECTED_DATA_LE_GENERAL = 'LE General Discoverable Mode';
var EXPECTED_DATA_BR_OR_EDR_NOT_SUPPORTED ='BR/EDR Not Supported';
var EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER ='Simultaneous LE and BR/EDR to Same Device Capable (Controller)';
var EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST ='Simultaneous LE and BR/EDR to Same Device Capable (Host)';

describe('ble data flags', function() {

  // Test the process function
  it('should convert a hexadecimal payload to Le Limited', function() {
  	flags.process(INPUT_DATA_LE_LIMITED, CURSOR, ADVERTISER_DATA);
    assert.equal(ADVERTISER_DATA.flags[0], EXPECTED_DATA_LE_LIMITED);
  });

  it('should convert a hexadecimal payload to LE General', function() {
  	flags.process(INPUT_DATA_LE_GENERAL, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.flags[0], EXPECTED_DATA_LE_GENERAL);
  });

  it('should convert a hexadecimal payload to BR/EDR Not Supported', function() {
  	flags.process(INPUT_DATA_BR_OR_EDR_NOT_SUPPORTED, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.flags[0], EXPECTED_DATA_BR_OR_EDR_NOT_SUPPORTED);
  });

  it('should convert a hexadecimal payload to Simultaneous LE and BR/EDR to Same Device Capable (Controller', function() {
  	flags.process(INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.flags[0], EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_CONTROLLER);
  });

  it('should convert a hexadecimal payload to Simultaneous LE and BR/EDR to Same Device Capable (Host)', function() {
  	flags.process(INPUT_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST, CURSOR, ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.flags[0], EXPECTED_DATA_SIMULTANEOUS_LE_AND_BR_OR_EDR_TO_SDC_HOST);
  });
});