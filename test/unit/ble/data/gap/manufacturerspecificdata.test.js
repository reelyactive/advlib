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
var INPUT_DATA_COMPANY_ONLY = '03ff0800';
var INPUT_DATA_IBEACON_ESTIMOTE = 
                      '26ff4c000215b9407f30f5f8466eaff925556b57fe6d294c903974';
var INPUT_DATA_IBEACON_UNKNOWN = 
                      '26ff4c000215000000000000000000000000000000001234567800';
var INPUT_DATA_AIRDROP = '17ff4c0005120000000000000000011bc238fa0000000000';
var INPUT_DATA_AIRPLAY = '06ff4c000a0100';
var INPUT_DATA_SNF_SINGLE = '17fff9000177665544332211004500000004991800123456';
var INPUT_DATA_SNS_MOTION =
                          '18fff90042450000003099001122334455012345aabbccabc0';

// Expected outputs for the scenario
var EXPECTED_DATA_COMPANY_ONLY = {
  companyName: "Motorola",
  companyIdentifierCode: "0008",
  data: ""
};
var EXPECTED_DATA_IBEACON_ESTIMOTE = {
  uuid: "b9407f30f5f8466eaff925556b57fe6d",
  major: "294c",
  minor: "9039",
  txPower: "116dBm",
  licenseeName: "Estimote"
};
var EXPECTED_DATA_IBEACON_UNKNOWN = {
  uuid: "00000000000000000000000000000000",
  major: "1234",
  minor: "5678",
  txPower: "0dBm",
  licenseeName: "Unknown"
};
var EXPECTED_DATA_AIRDROP = {
  length: 18,
  data: "0000000000000000011bc238fa0000000000"
};
var EXPECTED_DATA_AIRPLAY = {
  length: 1,
  data: "00"
};
var EXPECTED_DATA_SNF_SINGLE = {
  type: "V2 Single Payload",
  id: '0011223344556677',
  time: 69,
  scanCount: 1,
  batteryVoltage: '99',
  temperature: 24,
  calibration: '00',
  checksum: '123456'
};
var EXPECTED_DATA_SNS_MOTION = {
  type: "SnS Motion",
  timestamp: 69,
  temperature: 24,
  batteryVoltage: '99',
  eventCounters: [ 0, 273, 546, 819, 1092, 1365 ],
  accelerationX: 2730,
  accelerationY: 3003,
  accelerationZ: 3276
}

describe('ble data manufacturerspecificdata', function() {

  // Test the process function
  it('should convert ble advertiser data to a company manufacturer specific \
     data', function() {
    manufacturerspecificdata.process(INPUT_DATA_COMPANY_ONLY, CURSOR, 
                                     ADVERTISER_DATA);
    assert.deepEqual(ADVERTISER_DATA.manufacturerSpecificData, 
                     EXPECTED_DATA_COMPANY_ONLY);
  });
  
  it('should convert ble advertiser data to apple and iBeacon manufacturer \
     specificdata', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_IBEACON_ESTIMOTE, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.iBeacon, 
                     EXPECTED_DATA_IBEACON_ESTIMOTE);
  });

  it('should convert ble advertiser data for unknown iBeacon', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_IBEACON_UNKNOWN, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.iBeacon, 
                     EXPECTED_DATA_IBEACON_UNKNOWN);
  });

  it('should convert ble advertiser data for AirDrop', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_AIRDROP, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.airdrop, 
                     EXPECTED_DATA_AIRDROP);
  });

  it('should convert ble advertiser data for AirPlay', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_AIRPLAY, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.airplay, 
                     EXPECTED_DATA_AIRPLAY);
  });

  it('should convert ble advertiser data to StickNFind Beacon Single \
     specificdata', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_SNF_SINGLE, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.snfBeacon, 
                     EXPECTED_DATA_SNF_SINGLE);
  });

  it('should convert ble advertiser data to StickNSense Motion \
     specificdata', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_SNS_MOTION, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.snfBeacon, 
                     EXPECTED_DATA_SNS_MOTION);
  });
});
