/**
 * Copyright reelyActive 2015-2017
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
var INPUT_DATA_SERVICE_08 = '0dff4c000807ffffff00000045';
var INPUT_DATA_AIRPLAY = '0cff4c0009060200c0a80030';
var INPUT_DATA_SERVICE_0A = '06ff4c000a0100';
var INPUT_DATA_HANDOFF = '14ff4c000c0e0000041b59594de21ab6fbbb5cf6';
var INPUT_DATA_NEARBY = '08ff4c0010020100';
var INPUT_DATA_HANDOFF_AND_NEARBY =
                            '17ff4c000c0e0026487bd5d243b3614ae30fddeb10020b00';
var INPUT_DATA_ALTBEACON =
                    '1bff1801beac00010203040506070809101112131415161718190069';
var INPUT_DATA_SNF_SINGLE = '17fff9000177665544332211004500000004991800123456';
var INPUT_DATA_SNS_MOTION =
                          '18fff90042450000003099001122334455012345aabbccabc0';
var INPUT_DATA_MOTSAI = '09ff7402000015000040';

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
var EXPECTED_DATA_SERVICE_08 = {
  type: 8,
  length: 7,
  data: "ffffff00000045"
};
var EXPECTED_DATA_AIRPLAY = {
  length: 6,
  data: "0200c0a80030"
};
var EXPECTED_DATA_SERVICE_0A = {
  type: 10,
  length: 1,
  data: "00"
};
var EXPECTED_DATA_HANDOFF = {
  length: 14,
  data: "0000041b59594de21ab6fbbb5cf6"
};
var EXPECTED_DATA_NEARBY = {
  length: 2,
  data: "0100"
};
var EXPECTED_DATA_HANDOFF_AND_NEARBY = {
  length: 2,
  data: "0b00"
};
var EXPECTED_DATA_ALTBEACON = {
  id: "0001020304050607080910111213141516171819",
  refRSSI: "0dBm",
  mfgReserved: "69"
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
};
var EXPECTED_DATA_MOTSAI = {
  motion: false,
  temperature: 21,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 1
};

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

  it('should convert ble advertiser data for Apple service 0x08', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_SERVICE_08, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.service, 
                     EXPECTED_DATA_SERVICE_08);
  });

  it('should convert ble advertiser data for AirPlay', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_AIRPLAY, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.airplay, 
                     EXPECTED_DATA_AIRPLAY);
  });

  it('should convert ble advertiser data for Apple service 0x0a', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_SERVICE_0A, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.service, 
                     EXPECTED_DATA_SERVICE_0A);
  });

  it('should convert ble advertiser data for Apple handoff', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_HANDOFF, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.handoff, 
                     EXPECTED_DATA_HANDOFF);
  });

  it('should convert ble advertiser data for Apple nearby', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_NEARBY, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.nearby, 
                     EXPECTED_DATA_NEARBY);
  });

  it('should convert ble advertiser data for two Apple services', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_HANDOFF_AND_NEARBY, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.nearby, 
                     EXPECTED_DATA_HANDOFF_AND_NEARBY);
  });

  it('should convert ble advertiser data for AltBeacon', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_ALTBEACON, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.altBeacon, 
                     EXPECTED_DATA_ALTBEACON);
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

  it('should convert ble advertiser data for Motsai', function() {
    var advertiserData = { manufacturerSpecificData: {} };
    manufacturerspecificdata.process(INPUT_DATA_MOTSAI, CURSOR, 
                                     advertiserData);
    assert.deepEqual(advertiserData.manufacturerSpecificData.sensors, 
                     EXPECTED_DATA_MOTSAI);
  });
});
