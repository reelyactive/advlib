/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 // Comment out line 10 and 11 of /gap/companyidentifier.js to pass in the inputs directly from the test's input scenarios

var companyidentifier = require("../../../../../lib/ble/data/gap/companyidentifier.js").process;
var assert = require ('assert'); 

// Constants for the scenario
var DEVICE = {};

// Inputs for the scenario
var INPUT_DATA_CIC = '004c'; // companyIdentifierCode for Apple inc.
var INPUT_DATA_SD = 'fee6';  // serviceData

// Expected outputs for the scenario
var EXPECTED_DATA_CIC = 'http://reelyactive.com/metadata/apple.json'; // Apple URL
var EXPECTED_DATA_SD = 'http://reelyactive.com/metadata/seedlabs.json'; //Seed Labs URL

describe('ble data companyidentifier', function() {

  // Test the process function
  it('should identify a company identifier code', function() {
  	companyidentifier(INPUT_DATA_CIC,null,DEVICE);
    assert.deepEqual(DEVICE.url, EXPECTED_DATA_CIC);
  });
  
  it('should identify company service data', function() {
  	companyidentifier(null, INPUT_DATA_SD, DEVICE);
    assert.deepEqual(DEVICE.url, EXPECTED_DATA_SD);
  });

});

