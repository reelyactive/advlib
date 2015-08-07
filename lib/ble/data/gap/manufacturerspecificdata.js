/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');
var companyIdentifierCodes = require('../../common/assignednumbers/companyidentifiercodes.js');
var ibeacon = require('../../common/manufacturers/apple/ibeacon.js');


/**
 * Parse BLE advertiser data manufacturer specific data.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var companyIdentifierCode = payload.substr(cursor+6, 2);
  companyIdentifierCode += payload.substr(cursor+4, 2);

  var companyName = companyIdentifierCodes.companyNames[companyIdentifierCode];
  if(typeof companyName === 'undefined') {
    companyName = 'Unknown';
  }

  var data = payload.substr(cursor+8, pdu.getTagDataLength(payload, cursor)-4);

  advertiserData.manufacturerSpecificData = {
                                 companyName : companyName,
                                 companyIdentifierCode: companyIdentifierCode,
                                 data: data };

  // Apple proprietary data
  if(companyIdentifierCode === '004c') {
    var appleType = data.substr(0,2);
    switch(appleType) {
      case '02':
        processIBeacon(data, advertiserData);
        break;
      case '09':
        // TODO: determine what this is and process it
        break;
      default:
    }
  }

  // StickNFind proprietary data
  if(companyIdentifierCode === '00f9') {
    var packetType = data.substr(0,2);
    switch(packetType) {
      case '01':
        processSnFSingle(data, advertiserData);
        break;
      case '42':
        processSnSMotion(data, advertiserData);
        break;
      default:
    }
  }
}


/**
 * Parse Apple iBeacon manufacturer specific data.
 * @param {string} data The manufacturer-specific data as hex string.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processIBeacon(data, advertiserData) {
  var iBeacon = {};
  iBeacon.uuid = data.substr(4,32);
  iBeacon.major = data.substr(36,4);
  iBeacon.minor = data.substr(40,4);
  iBeacon.txPower = pdu.convertTxPower(data.substr(44,2));

  var licenseeName = ibeacon.licenseeNames[iBeacon.uuid];
  if(typeof licenseeName === 'undefined') {
    licenseeName = 'Unknown';
  }
  iBeacon.licenseeName = licenseeName;

  advertiserData.manufacturerSpecificData.iBeacon = iBeacon;
}


/**
 * Parse StickNFind 'single payload' manufacturer specific data.
 * @param {string} data The manufacturer-specific data as hex string.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processSnFSingle(data, advertiserData) {
  var snfBeacon = {};
  snfBeacon.type = 'V2 Single Payload';
  snfBeacon.id = pdu.reverseBytes(data.substr(2,16));
  snfBeacon.time = parseInt(pdu.reverseBytes(data.substr(18,8)),16);
  snfBeacon.scanCount = parseInt(data.substr(26,2),16) / 4;
  snfBeacon.batteryVoltage = data.substr(28,2);
  snfBeacon.temperature = parseInt(data.substr(30,2),16);
  if(snfBeacon.temperature > 127) {
    snfBeacon.temperature = 127 - snfBeacon.temperature;
  }
  snfBeacon.temperature += (parseInt(data.substr(26,2),16) % 4) / 4;
  snfBeacon.calibration = data.substr(32,2);
  snfBeacon.checksum = data.substr(34,6);

  advertiserData.manufacturerSpecificData.snfBeacon = snfBeacon;
}


/**
 * Parse StickNSense 'motion' manufacturer specific data.
 * @param {string} data The manufacturer-specific data as hex string.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processSnSMotion(data, advertiserData) {
  var snfBeacon = {};
  snfBeacon.type = 'SnS Motion';
  snfBeacon.timestamp = parseInt(pdu.reverseBytes(data.substr(2,8)),16);
  snfBeacon.temperature = parseInt(data.substr(10,2),16);
  if(snfBeacon.temperature > 127) {
    snfBeacon.temperature = 127 - snfBeacon.temperature;
  }
  snfBeacon.temperature = snfBeacon.temperature / 2;
  snfBeacon.temperature += (parseInt(data.substr(41,1),16)) / 4;
  snfBeacon.batteryVoltage = data.substr(12,2);
  snfBeacon.eventCounters = [];
  snfBeacon.eventCounters.push(data.substr(26,1) + data.substr(14,2));
  snfBeacon.eventCounters.push(data.substr(27,1) + data.substr(16,2));
  snfBeacon.eventCounters.push(data.substr(28,1) + data.substr(18,2));
  snfBeacon.eventCounters.push(data.substr(29,1) + data.substr(20,2));
  snfBeacon.eventCounters.push(data.substr(30,1) + data.substr(22,2));
  snfBeacon.eventCounters.push(data.substr(31,1) + data.substr(24,2));
  for(var cCounter = 0; cCounter < 6; cCounter++) {
    var hexStringCount = snfBeacon.eventCounters[cCounter];
    snfBeacon.eventCounters[cCounter] = parseInt(hexStringCount,16);
  }
  snfBeacon.accelerationX = parseInt((data.substr(32,2) +
                                      data.substr(38,1)), 16);
  snfBeacon.accelerationY = parseInt((data.substr(34,2) +
                                      data.substr(39,1)), 16);
  snfBeacon.accelerationZ = parseInt((data.substr(36,2) +
                                      data.substr(40,1)), 16);

  advertiserData.manufacturerSpecificData.snfBeacon = snfBeacon;
}

module.exports.process = process;
