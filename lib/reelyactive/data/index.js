/**
 * Convert a raw radio sensor data payload.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {object} Sensor data.
 */
function process(payload) {
  var batteryRaw = parseInt(payload.substr(2,2),16) % 64;
  var temperatureRaw = (parseInt(payload.substr(0,3),16) >> 2) % 256;
  var battery = ((batteryRaw / 34) + 1.8).toFixed(2) + "V";
  var temperature = ((temperatureRaw - 80) / 2).toFixed(1) + "C";
  return {
    battery: battery,
    temperature: temperature
  };
}

module.exports.process = process;