/**
 * Copyright reelyActive 2015-2018
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
 * @param {string} data The raw manufacturer data as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(data) {
  var companyIdentifierCode = data.substr(2,2);
  companyIdentifierCode += data.substr(0,2);

  var companyName = companyIdentifierCodes.companyNames[companyIdentifierCode];
  if(typeof companyName === 'undefined') {
    companyName = 'Unknown';
  }

  // NOTE: this is for legacy compatibility
  var advertiserData = {
    manufacturerSpecificData: {
      companyName : companyName,
      companyIdentifierCode: companyIdentifierCode,
      data: data.substr(4)
    }
  };

  // Handle the unique case of AltBeacon
  if(altbeacon.isAltBeacon(advertiserData)) {
    altbeacon.process(advertiserData);
    return advertiserData.manufacturerSpecificData;
  }

  // Interpret the manufacturer specific data, if possible
  // Kindly respect ascending order of company identifier codes 
  switch(companyIdentifierCode) {
    case '004c':
      apple.process(advertiserData);
      return advertiserData.manufacturerSpecificData;
    case '00f9':
      sticknfind.process(advertiserData);
      return advertiserData.manufacturerSpecificData;
    case '015d':
      estimote.process(advertiserData);
      return advertiserData.manufacturerSpecificData;
    case '0274':
      motsai.process(advertiserData);
      return advertiserData.manufacturerSpecificData;
    case '0583':
      codebluecommunications.process(advertiserData);
      return advertiserData.manufacturerSpecificData;
    default:
      return advertiserData.manufacturerSpecificData;
  }
}


module.exports.process = process;
