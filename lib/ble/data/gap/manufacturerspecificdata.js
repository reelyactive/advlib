/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 var pdu = require('../../common/util/pdu.js');

 /**
 * Parse BLE advertiser data manufacturer specific data.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var companyIdentifierCode = payload.substr(cursor+6, 2);

  companyIdentifierCode += payload.substr(cursor+4, 2);

  var data = payload.substr(cursor+8, pdu.getTagDataLength(payload, cursor)-4);

  advertiserData.manufacturerSpecificData = {
                                 companyIdentifierCode: companyIdentifierCode,
                                 data: data };

  var isApple = (companyIdentifierCode == "004c");

  var isIBeacon = (data.substr(0,4) == "0215");

  if(isApple && isIBeacon) {
    var iBeacon = {};
    iBeacon.uuid = data.substr(4,32);
    iBeacon.major = data.substr(36,4);
    iBeacon.minor = data.substr(40,4);
    iBeacon.txPower = pdu.convertTxPower(data.substr(44,2));

    advertiserData.manufacturerSpecificData.iBeacon = iBeacon; 
  }
}

module.exports.process = process;
