/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 var pdu = require('../../common/util/pdu.js');
 var companyIdentifierCodes = require('../../common/assignednumbers/companyidentifiercodes.js');


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

  var data = payload.substr(cursor+8, pdu.getTagDataLength(payload, cursor)-4);

  advertiserData.manufacturerSpecificData = {
                                 companyName : companyName,
                                 companyIdentifierCode: companyIdentifierCode,
                                 data: data };

  // Apple-specific data
  if(companyIdentifierCode === '004c') {
    var appleType = data.substr(0,2);
    switch(appleType) {
      case '02':
        iBeacon(data, advertiserData);
        break;
      case '09':
        // TODO: determine what this is and process it
        break;
      default:
    }
  }
}


/**
 * Parse BLE advertiser data manufacturer specific data.
 * @param {string} data The manufacturer-specific data as hex string.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function iBeacon(data, advertiserData) {
  var iBeacon = {};
  iBeacon.uuid = data.substr(4,32);
  iBeacon.major = data.substr(36,4);
  iBeacon.minor = data.substr(40,4);
  iBeacon.txPower = pdu.convertTxPower(data.substr(44,2));

  advertiserData.manufacturerSpecificData.iBeacon = iBeacon;
}

module.exports.process = process;
