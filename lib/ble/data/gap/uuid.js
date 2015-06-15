/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');
 
/**
 * Parse BLE advertiser non-complete 16-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function nonComplete16BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var nonComplete16BitUUIDs = pdu.reverseBytes(data);
  advertiserData.nonComplete16BitUUIDs = nonComplete16BitUUIDs;
}


/**
 * Parse BLE advertiser complete 16-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function complete16BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var complete16BitUUIDs = pdu.reverseBytes(data);
  advertiserData.complete16BitUUIDs = complete16BitUUIDs;
}


/**
 * Parse BLE advertiser non-complete 128-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function nonComplete128BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var nonComplete128BitUUIDs = pdu.reverseBytes(data); 
  advertiserData.nonComplete128BitUUIDs = nonComplete128BitUUIDs;
}


/**
 * Parse BLE advertiser complete 128-bit UUIDs.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function complete128BitUUIDs(payload, cursor, advertiserData) {
  var data = payload.substr(cursor+4, pdu.getTagDataLength(payload, cursor));
  var complete128BitUUIDs = pdu.reverseBytes(data);
  advertiserData.complete128BitUUIDs = complete128BitUUIDs;
}


module.exports.nonComplete16BitUUIDs = nonComplete16BitUUIDs;
module.exports.complete16BitUUIDs = complete16BitUUIDs;
module.exports.nonComplete128BitUUIDs = nonComplete128BitUUIDs;
module.exports.complete128BitUUIDs = complete128BitUUIDs;