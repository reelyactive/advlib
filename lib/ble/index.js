/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var identifier = require('./common/util/identifier.js');

var address = require('./address/index.js');
var header = require('./header/index.js');
var data = require('./data/index.js');

/**
 * Process a raw Bluetooth Low Energy radio payload into semantically
 * meaningful information.
 * address.  Note that the payload is LSB first.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {AdvA48} Advertiser address identifier.
 */
function process(payload) {
  var advA48 = address.process(payload.substr(4,12));
  advA48.advHeader = header.process(payload.substr(0,4));
  advA48.advData = data.process(payload.substr(16));
  return advA48;
}

module.exports.process = process;
module.exports.address = address;
module.exports.data = data;
