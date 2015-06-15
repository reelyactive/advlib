/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var manufacturerspecificdata = 
        require("../../../../../lib/ble/data/gap/manufacturerspecificdata.js");
var assert = require('assert'); 

// Constants for the scenario
var CURSOR = 0;
var ADVERTISER_DATA = {};
  
// Inputs for the scenario
var INPUT_DATA_COMPANY_ONLY = '03ff8c00';
var INPUT_DATA_IBEACON = 
                      '26ff4c000215b9407f30f5f8466eaff925556b57fe6d294c903974';

// Expected outputs for the scenario
var EXPECTED_DATA_COMPANY_ONLY = {
  companyIdentifierCode: "008c",
  data: ""
};
var EXPECTED_DATA_APPLE_AND_IBEACON = {
  uuid: "b9407f30f5f8466eaff925556b57fe6d",
  major: "294c",
  minor: "9039",
  txPower: "116dBm"
};

describe('ble data manufacturerspecificdata', function() {

  // Test the process function
  it('should convert ble advertiser data to a apple manufacturer specific \
     data', function() {
    manufacturerspecificdata.process(INPUT_DATA_COMPANY_ONLY, CURSOR, 
                                     ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.manufacturerSpecificData, 
                     EXPECTED_DATA_COMPANY_ONLY);
  });
  
  it('should convert ble advertiser data to apple and iBeacon manufacturer \
     specificdata', function() {
    ADVERTISER_DATA.manufacturerSpecificData.iBeacon = {};
    manufacturerspecificdata.process(INPUT_DATA_IBEACON, CURSOR, 
                                     ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.manufacturerSpecificData.iBeacon, 
                     EXPECTED_DATA_APPLE_AND_IBEACON);
  });
});
