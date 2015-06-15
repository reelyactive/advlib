/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');

/**
 * Parse BLE advertiser TX power.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  advertiserData.txPower = pdu.convertTxPower(payload.substr(cursor+4,2));
}

module.exports.process = process;
