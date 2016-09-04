/**
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */


/**
 * Parse Estimote Nearable manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var nearable = {};
  var data = advertiserData.manufacturerSpecificData.data;

  nearable.id = data.substr(2,16);
  nearable.temperature = toTemperature(data.substr(24,2), data.substr(22,2));
  if(parseInt(data.substr(26,2),16) & 0x40) {
    nearable.currentState = 'motion';
  }
  else {
    nearable.currentState = 'still';
  }
  nearable.accelerationX = toAcceleration(data.substr(28,2));
  nearable.accelerationY = toAcceleration(data.substr(30,2));
  nearable.accelerationZ = toAcceleration(data.substr(32,2));
  nearable.currentStateSeconds = toDuration(data.substr(34,2));
  nearable.previousStateSeconds = toDuration(data.substr(36,2));
  nearable.statusBytes = [ data.substr(0,2), data.substr(18,2),
                           data.substr(20,2), data.substr(24,2),
                           data.substr(26,2), data.substr(38,2) ];

  advertiserData.manufacturerSpecificData.nearable = nearable;
}


/**
 * Convert the given bytes to temperature.
 * @param {String} upper4 The most-significant 4 bits of the temperature.
 * @param {String} lower8 The least-significant 8 bits of the temperature.
 */
function toTemperature(upper4, lower8) {
  var data = ((parseInt(upper4,16) % 16) * 256) + parseInt(lower8,16);
  if(data > 2047) {
    return (data - 4096) / 16;
  }
  return data / 16;
}


/**
 * Convert the given twos complement hexadecimal string to acceleration.
 * @param {String} byte The acceleration data byte as a string.
 */
function toAcceleration(byte) {
  var data = parseInt(byte,16);
  if(data > 127) {
    return data - 256;
  }
  return data;
}


/**
 * Convert the given twos complement hexadecimal string to duration.
 * @param {String} byte The duration data byte as a string.
 */
function toDuration(byte) {
  var data = parseInt(byte,16);
  if(data < 64) { // Less than 0x40 is seconds
    return data;
  }
  if(data >= 128) { // Above 0x80 is hours
    return (data % 128) * 3600;
  }
  return (data % 64) * 60; // Between the two is minutes
}

module.exports.process = process;
