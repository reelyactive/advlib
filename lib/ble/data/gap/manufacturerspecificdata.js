/**
 * Copyright reelyActive 2015-2017
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');
var companyIdentifierCodes =
            require('../../common/assignednumbers/companyidentifiercodes.js');
var apple = require('../../common/manufacturers/apple/index.js');
var codebluecommunications = 
        require('../../common/manufacturers/codebluecommunications/index.js');
var estimote = require('../../common/manufacturers/estimote/index.js');
var motsai = require('../../common/manufacturers/motsai/index.js');
var altbeacon =
            require('../../common/manufacturers/radiusnetworks/altbeacon.js');
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

  // Handle the unique case of AltBeacon
  if(altbeacon.isAltBeacon(advertiserData)) {
    altbeacon.process(advertiserData);
    return;
  }

  // Interpret the manufacturer specific data, if possible
  // Kindly respect ascending order of company identifier codes 
  switch(companyIdentifierCode) {
    case '004c':
      apple.process(advertiserData);
      break;
    case '00f9':
      sticknfind.process(advertiserData);
      break;
    case '015d':
      estimote.process(advertiserData);
      break;
    case '0274':
      motsai.process(advertiserData);
      break;
    case '0583':
      codebluecommunications.process(advertiserData);
      break;
    default:
  }
}


module.exports.process = process;
