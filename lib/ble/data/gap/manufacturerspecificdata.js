/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');
var companyIdentifierCodes = require('../../common/assignednumbers/companyidentifiercodes.js');
var apple = require('../../common/manufacturers/apple/index.js');
var sticknfind = require('../../common/manufacturers/sticknfind/index.js');


/**
 * Parse BLE advertiser data manufacturer specific data.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var companyIdentifierCode = payload.substr(cursor+6, 2);
  companyIdentifierCode += payload.substr(cursor+4, 2);

  var companyName = companyIdentifierCodes.companyNames[companyIdentifierCode];
  if(typeof companyName === 'undefined') {
    companyName = 'Unknown';
  }

  var data = payload.substr(cursor+8, pdu.getTagDataLength(payload, cursor)-4);

  advertiserData.manufacturerSpecificData = {
                                 companyName : companyName,
                                 companyIdentifierCode: companyIdentifierCode,
                                 data: data };

  // Apple proprietary data
  if(companyIdentifierCode === '004c') {
    apple.process(advertiserData);
  }

  // StickNFind proprietary data
  if(companyIdentifierCode === '00f9') {
    sticknfind.process(advertiserData);
  }
}


module.exports.process = process;
