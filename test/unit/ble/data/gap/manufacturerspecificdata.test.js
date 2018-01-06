/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */

var manufacturerspecificdata = 
        require("../../../../../lib/ble/data/gap/manufacturerspecificdata.js");
var assert = require('assert'); 
 
// Inputs for the scenario
var INPUT_DATA_COMPANY_ONLY = '0800';
var INPUT_DATA_IBEACON_ESTIMOTE = 
                      '4c000215b9407f30f5f8466eaff925556b57fe6d294c903974';
var INPUT_DATA_IBEACON_UNKNOWN = 
                      '4c000215000000000000000000000000000000001234567800';
var INPUT_DATA_AIRDROP = '4c0005120000000000000000011bc238fa0000000000';
var INPUT_DATA_AIRPODS = '4c00071901022021880f00000049bcba4477206b0447472c771e53bbeb';
var INPUT_DATA_SERVICE_08 = '4c000807ffffff00000045';
var INPUT_DATA_AIRPLAY_DESTINATION = '4c0009060200c0a80030';
var INPUT_DATA_AIRPLAY_SOURCE = '4c000a0100';
var INPUT_DATA_HANDOFF = '4c000c0e0000041b59594de21ab6fbbb5cf6';
var INPUT_DATA_NEARBY = '4c0010020100';
var INPUT_DATA_HANDOFF_AND_NEARBY =
                            '4c000c0e0026487bd5d243b3614ae30fddeb10020b00';
var INPUT_DATA_ALTBEACON =
                    '1801beac00010203040506070809101112131415161718190069';
var INPUT_DATA_SNF_SINGLE = 'f9000177665544332211004500000004991800123456';
var INPUT_DATA_SNS_MOTION = 'f90042450000003099001122334455012345aabbccabc0';
var INPUT_DATA_MOTSAI = '7402000015000040';
var INPUT_DATA_NORBLE = '830501cc1234567881f87faabbccdd17';
var INPUT_DATA_PUCKYACTIVE = '8305022b1f736f9d03eab70a1b04e2';

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
var EXPECTED_DATA_AIRPODS = {
  length: 25,
  data: "01022021880f00000049bcba4477206b0447472c771e53bbeb"
};
var EXPECTED_DATA_SERVICE_08 = {
  type: 8,
  length: 7,
  data: "ffffff00000045"
};
var EXPECTED_DATA_AIRPLAY_DESTINATION = {
  length: 6,
  role: "destination",
  data: "0200c0a80030"
};
var EXPECTED_DATA_AIRPLAY_SOURCE = {
  length: 1,
  role: "source",
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
var EXPECTED_DATA_NORBLE = {
  cyclicCount: 6,
  instanceId: '12345678',
  accelerationX: 'n/a',
  accelerationY: 1.9375,
  accelerationZ: -1.9375,
  batteryPercentage: 100,
  nearest: [
    { instanceId: 'aabbccdd', rssi: -69 }
  ]
};
var EXPECTED_DATA_PUCKYACTIVE = {
  cyclicCount: 1,
  batteryVoltage: 2.7215686274509805,
  temperature: 15.5,
  lightPercentage: 62,
  capSensePercentage: 1,
  magneticFieldX: -5449,
  magneticFieldY: 2587,
  magneticFieldZ: 1250
};

describe('ble data manufacturerspecificdata', function() {

  // Test the process function
  it('should convert ble advertiser data to a company manufacturer specific \
     data', function() {
    assert.deepEqual(manufacturerspecificdata.process(INPUT_DATA_COMPANY_ONLY), 
                     EXPECTED_DATA_COMPANY_ONLY);
  });
  
  it('should convert ble advertiser data to apple and iBeacon manufacturer \
     specificdata', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_IBEACON_ESTIMOTE).iBeacon, 
                     EXPECTED_DATA_IBEACON_ESTIMOTE);
  });

  it('should convert ble advertiser data for unknown iBeacon', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_IBEACON_UNKNOWN).iBeacon, 
                     EXPECTED_DATA_IBEACON_UNKNOWN);
  });

  it('should convert ble advertiser data for AirDrop', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_AIRDROP).airdrop, 
                     EXPECTED_DATA_AIRDROP);
  });

  it('should convert ble advertiser data for AirPods', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_AIRPODS).airpods, 
                     EXPECTED_DATA_AIRPODS);
  });

  it('should convert ble advertiser data for Apple service 0x08', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_SERVICE_08).service, 
                     EXPECTED_DATA_SERVICE_08);
  });

  it('should convert ble advertiser data for AirPlay destination', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_AIRPLAY_DESTINATION).airplay, 
                     EXPECTED_DATA_AIRPLAY_DESTINATION);
  });

  it('should convert ble advertiser data for AirPlay source', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_AIRPLAY_SOURCE).airplay, 
                     EXPECTED_DATA_AIRPLAY_SOURCE);
  });

  it('should convert ble advertiser data for Apple handoff', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_HANDOFF).handoff, 
                     EXPECTED_DATA_HANDOFF);
  });

  it('should convert ble advertiser data for Apple nearby', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_NEARBY).nearby, 
                     EXPECTED_DATA_NEARBY);
  });

  it('should convert ble advertiser data for two Apple services', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_HANDOFF_AND_NEARBY).nearby, 
                     EXPECTED_DATA_HANDOFF_AND_NEARBY);
  });

  it('should convert ble advertiser data for AltBeacon', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_ALTBEACON).altBeacon, 
                     EXPECTED_DATA_ALTBEACON);
  });

  it('should convert ble advertiser data to StickNFind Beacon Single \
     specificdata', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_SNF_SINGLE).snfBeacon, 
                     EXPECTED_DATA_SNF_SINGLE);
  });

  it('should convert ble advertiser data to StickNSense Motion \
     specificdata', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_SNS_MOTION).snfBeacon, 
                     EXPECTED_DATA_SNS_MOTION);
  });

  it('should convert ble advertiser data for Motsai', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_MOTSAI).sensors, 
                     EXPECTED_DATA_MOTSAI);
  });

  it('should convert ble advertiser data for NorBLE', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_NORBLE).norble, 
                     EXPECTED_DATA_NORBLE);
  });

  it('should convert ble advertiser data for puckyActive', function() {
    assert.deepEqual(manufacturerspecificdata.process(
                     INPUT_DATA_PUCKYACTIVE).puckyActive, 
                     EXPECTED_DATA_PUCKYACTIVE);
  });
});
