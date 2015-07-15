/**
 * Convert a raw radio sensor data payload.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {object} Sensor data.
 */
function process(payload) {
  var flags = parseInt(payload,16);
  var transmissionCount = flags >> 2;
  return { transmissionCount: transmissionCount };
}

module.exports.process = process;