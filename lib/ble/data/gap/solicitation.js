/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');

 /**
 * Parse BLE advertiser data service solicitation 16-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function solicitation16BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var solicitation16BitUUIDs = pdu.reverseBytes(data);
  advertiserData.solicitation16BitUUIDs = solicitation16BitUUIDs;
}


/**
 * Parse BLE advertiser data service solicitation 128-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function solicitation128BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var solicitation128BitUUIDs = pdu.reverseBytes(data);
  advertiserData.solicitation128BitUUIDs = solicitation128BitUUIDs;
}

module.exports.solicitation16BitUUIDs = solicitation16BitUUIDs;
module.exports.solicitation128BitUUIDs = solicitation128BitUUIDs;