/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');

 /**
 * Parse generic data.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData, adType) {
  var genericData = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  advertiserData[adType] = genericData;
}

module.exports.process = process;