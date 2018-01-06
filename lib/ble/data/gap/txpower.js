/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var pdu = require('../../common/util/pdu.js');


/**
 * Parse BLE advertiser TX power.
 * @param {string} data The raw txPower data as a hexadecimal-string.
 */
function process(data) {
  return pdu.convertTxPower(data);
}


module.exports.process = process;
