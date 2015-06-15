/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var identifier = require('../common/util/identifier.js')

/**
 * Convert a raw Bluetooth Low Energy advertiser address.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {Object} 48-bit advertiser address.
 */
function process(payload) {
  var advAString = payload.substr(10,2);
  advAString += payload.substr(8,2);
  advAString += payload.substr(6,2);
  advAString += payload.substr(4,2);
  advAString += payload.substr(2,2);
  advAString += payload.substr(0,2);
  return new identifier(identifier.ADVA48, advAString);
}

module.exports.process = process;