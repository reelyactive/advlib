/**
 * Copyright reelyActive 2015-2016
 * We believe in an open Internet of Things
 */

var pdu = require('../../common/util/pdu.js');
var companyIdentifierCodes =
            require('../../common/assignednumbers/companyidentifiercodes.js');
var apple = require('../../common/manufacturers/apple/index.js');
var altbeacon = require('../../common/manufacturers/altbeacon/index.js');
var sticknfind = require('../../common/manufacturers/sticknfind/index.js');
var estimote = require('../../common/manufacturers/estimote/index.js');


/**
 * Parse BLE advertiser data manufacturer specific data.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var companyIdentifierCode = payload.substr(cursor+6, 2);
  companyIdentifierCode += payload.substr(cursor+4, 2);

  var altBeacon = false;

  var adLength = payload.substr(cursor, 2);

  console.log("adLength: ", adLength);

  if (adLength == "1b")
  {
    var beaconCode = payload.substr(cursor+8, 4);

    console.log("beaconCode: ", beaconCode);

    if (beaconCode == "beac")
    {
      altBeacon = true;
    }
  }

  var companyName = companyIdentifierCodes.companyNames[companyIdentifierCode];
  if(typeof companyName === 'undefined') {
    companyName = 'Unknown';
  }

  var data = payload.substr(cursor+8, pdu.getTagDataLength(payload, cursor)-4);

  if (!advertiserData.manufacturerSpecificData)
    advertiserData.manufacturerSpecificData = [];

  advertiserData.manufacturerSpecificData.push({
                                 companyName : companyName,
                                 companyIdentifierCode: companyIdentifierCode,
                                 data: data });

  // Interpret the manufacturer specific data, if possible
  // Kindly respect ascending order of company identifier codes 

  if (altBeacon)
  {
    altbeacon.process(advertiserData.manufacturerSpecificData[advertiserData.manufacturerSpecificData.length-1]);
  }
  else
  {
    switch(companyIdentifierCode) {
      case '004c':
        apple.process(advertiserData.manufacturerSpecificData[advertiserData.manufacturerSpecificData.length-1]);
        break;
      case '00f9':
        sticknfind.process(advertiserData.manufacturerSpecificData[advertiserData.manufacturerSpecificData.length-1]);
        break;
      case '015d':
        estimote.process(advertiserData.manufacturerSpecificData[advertiserData.manufacturerSpecificData.length-1]);
        break;
      default:
    }
  }
}


module.exports.process = process;
