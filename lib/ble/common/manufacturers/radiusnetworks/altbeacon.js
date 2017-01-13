/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


var pdu = require('../../util/pdu.js');


var LENGTH = 27;
var CODE = 'beac';


/**
 * Parse AltBeacon manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var altBeacon = {};
  var data = advertiserData.manufacturerSpecificData.data;

  altBeacon.id = data.substr(4,40);
  altBeacon.refRSSI = pdu.convertTxPower(data.substr(44,2));
  altBeacon.mfgReserved = data.substr(46,2);

  advertiserData.manufacturerSpecificData.altBeacon = altBeacon;
}


/**
 * Verify if the given manufacturerSpecificData represents an AltBeacon.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function isAltBeacon(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data;
  var isCorrectLength = ((data.length + 6) === (LENGTH * 2));
  var isCorrectCode = (data.substr(0,4) === CODE);

  return isCorrectLength && isCorrectCode;
}


module.exports.LENGTH = LENGTH;
module.exports.CODE = CODE;
module.exports.process = process;
module.exports.isAltBeacon = isAltBeacon;
