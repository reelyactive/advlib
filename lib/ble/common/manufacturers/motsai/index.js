/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse BLE advertiser manufacturer specific data for Motsai.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data;
  var packetType = data.substr(0,2);

  switch(packetType) {
    case '00':
      processSensors(advertiserData);
      return;
    default:
      return;
  }
}


/**
 * Parse Motsai manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processSensors(advertiserData) {
  var sensors = {};
  var data = advertiserData.manufacturerSpecificData.data;

  var status = data.substr(2,1);
  sensors.motion = ((status & 0x1) === 0x01);
  sensors.temperature = toTemperature(data.substr(4,2) + data.substr(3,1));
  sensors.accelerationX = toAcceleration(data.substr(6,2));
  sensors.accelerationY = toAcceleration(data.substr(8,2));
  sensors.accelerationZ = toAcceleration(data.substr(10,2));

  advertiserData.manufacturerSpecificData.sensors = sensors;
}


/**
 * Convert the given bytes to temperature.
 * @param {String} bits The 12 bits of the encoded temperature.
 */
function toTemperature(bits) {
  var data = parseInt(bits, 16);
  if(data > 2047) {
    return (data - 4096) / 16;
  }
  return data / 16;
}


/**
 * Convert the given twos complement hexadecimal string to acceleration in g.
 * @param {String} byte The acceleration data byte as a string.
 */
function toAcceleration(byte) {
  var data = parseInt(byte, 16);
  if(data > 127) {
    return (data - 256) / 64;
  }
  return data / 64;
}


module.exports.process = process;
