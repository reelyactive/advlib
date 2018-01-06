/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var pdu = require('../../common/util/pdu.js');


/**
 * Parse BLE advertiser data non-complete shortened local name.
 * @param {string} data The raw name data as a hexadecimal-string.
 */
function process(data) {
  var result = '';
  for(var cChar = 0; cChar < data.length; cChar += 2) {
    result += String.fromCharCode(parseInt(data.substr(cChar,2),16));
  }
  return result;
}


module.exports.process = process;
