/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var gap = require('./gap/index.js');
var gatt = require('./gatt/index.js');


/**
 * Convert a raw Bluetooth Low Energy advertising packet into its meaningful
 * parts.
 * https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {Object} Semantically meaningful advertising packet.
 */
function process(payload) {
  payload = payload.toLowerCase();

  return gap.process(payload);
}

module.exports.process = process;
module.exports.gap = gap;
module.exports.gatt = gatt;
