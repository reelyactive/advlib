/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var pdu = require('../../common/util/pdu.js');


/**
 * Parse BLE advertiser solicitation UUIDs.
 * @param {string} data The raw solicitation data as a hexadecimal-string.
 */
function process(data) {
  // NOTE: eventually this will become an array
  return pdu.reverseBytes(data);
}


module.exports.process = process;
