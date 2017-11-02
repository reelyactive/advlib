/**
 * Copyright reelyActive 2015-2017
 * We believe in an open Internet of Things
 */


var identifier = require('./common/util/identifier.js');
var data = require('./data/index.js');
var flags = require('./flags/index.js');


/**
 * Process a raw reelyActive radio payload into semantically meaningful
 * information.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {EUI64} EUI-64 identifier.
 */
function process(payload) {
  payload = payload.toLowerCase();

  var ra28 = new identifier(identifier.RA28, payload.substr(0, 7));
  var eui64 = ra28.toType(identifier.EUI64);
  eui64.flags = flags.process(payload.substr(7, 1));
  if (payload.length === 12) {
    eui64.data = data.process(payload.substr(8, 4));
  }
  return eui64;
}


module.exports.process = process;
