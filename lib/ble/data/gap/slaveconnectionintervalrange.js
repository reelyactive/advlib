/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');

 /**
 * Parse BLE advertiser data slave connection interval range.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var result = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  advertiserData.slaveConnectionIntervalRange = result;
}

module.exports.process = process;