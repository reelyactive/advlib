/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse BLE advertiser manufacturer specific data for Code Blue Comms.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data;
  var frameType = data.substr(0,2);

  switch(frameType) {
    case '01':
      processNorwegianBlue(advertiserData);
      return;
    case '02':
      processPuckyActive(advertiserData);
      return;
    default:
      return;
  }
}


/**
 * Parse Norwegian Blue (NorBLE) data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processNorwegianBlue(advertiserData) {
  var norble = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var frameLength = parseInt(data.substr(2,2), 16) & 0x1f;

  norble.cyclicCount = parseInt(data.substr(2,1), 16) >> 1;
  norble.instanceId = data.substr(4,8);
  norble.accelerationX = toAcceleration(data.substr(12,2), true);
  norble.accelerationY = toAcceleration(data.substr(13,2), false);
  norble.accelerationZ = toAcceleration(data.substr(15,2), true);
  norble.batteryPercentage = toBatteryPercentage(data.substr(16,2), false);
  norble.nearest = [];

  for(nearestIndex = 9; nearestIndex < (frameLength + 2); nearestIndex += 5) {
    var instanceId = data.substr(nearestIndex * 2, 8);
    var rssi = toRssi(data.substr(nearestIndex * 2 + 8, 2));
    norble.nearest.push( { instanceId: instanceId, rssi: rssi } );
  }

  advertiserData.manufacturerSpecificData.norble = norble;
}


/**
 * Parse puckyActive data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processPuckyActive(advertiserData) {
  var puckyActive = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var frameLength = parseInt(data.substr(2,2), 16) & 0x1f;

  puckyActive.cyclicCount = parseInt(data.substr(2,1), 16) >> 1;
  puckyActive.batteryVoltage = toBatteryVoltage(data.substr(6,2));
  puckyActive.temperature = toTemperature(data.substr(8,2));
  puckyActive.lightPercentage = toPercentage(data.substr(10,2));
  puckyActive.capSensePercentage = toPercentage(data.substr(12,2));
  puckyActive.magneticFieldX = toMagneticField(data.substr(14,4));
  puckyActive.magneticFieldY = toMagneticField(data.substr(18,4));
  puckyActive.magneticFieldZ = toMagneticField(data.substr(22,4));

  advertiserData.manufacturerSpecificData.puckyActive = puckyActive;
}


/**
 * Convert the given bytes to battery percentage.
 * @param {String} bits The 6 bits of the battery level.
 */
function toBatteryPercentage(bits, isUpper) {
  var data = parseInt(bits, 16);
  if(isUpper) {
    data = data >> 2;
  }
  else {
    data &= 0x3f;
  }
  return Math.round(100 * data / 63);
}


/**
 * Convert the given twos complement hexadecimal string to acceleration in g.
 * @param {String} byte The acceleration data byte as a string.
 */
function toAcceleration(byte, isUpper) {
  var data = parseInt(byte, 16);
  if(isUpper) {
    data = data >> 2;
  }
  else {
    data &= 0x3f;
  }
  if(data === 32) {
    return 'n/a';
  }
  if(data > 31) {
    return (data - 64) / 16;
  }
  return data / 16;
}


/**
 * Convert the given byte to RSSI.
 * @param {String} bits The 6 bits of the battery level.
 */
function toRssi(bits) {
  var data = parseInt(bits, 16);

  return (data & 0x3f) - 92;
}


/**
 * Convert the given byte to battery voltage.
 * @param {String} byte The encoded battery voltage byte.
 */
function toBatteryVoltage(byte) {
  var data = parseInt(byte, 16);

  return 2 + (1.6 * data / 0xff);
}


/**
 * Convert the given byte to temperature.
 * @param {String} byte The encoded temperature byte.
 */
function toTemperature(byte) {
  var data = parseInt(byte, 16);

  return -40 + (data / 2);
}


/**
 * Convert the given byte to a percentage.
 * @param {String} byte The encoded byte (0x00 = 0%, 0xff = 100%).
 */
function toPercentage(byte) {
  var data = parseInt(byte, 16);

  return Math.round(100 * data / 0xff);
}


/**
 * Convert the given two bytes to a signed value.
 * @param {String} bytes The signed magnetic field bytes.
 */
function toMagneticField(bytes) {
  var upper = parseInt(bytes.substr(0,2), 16);
  var lower = parseInt(bytes.substr(2,2), 16);

  if(upper > 127) {
    upper = upper - 256;
  }

  return (upper * 256) + lower;
}


module.exports.process = process;
