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
    var status = data.substr(nearestIndex * 2 + 8, 2);
    norble.nearest.push( { instanceId: instanceId, status: status } );
  }

  advertiserData.manufacturerSpecificData.norble = norble;
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


module.exports.process = process;
