/**
 * Copyright reelyActive 2015-2017
 * We believe in an open Internet of Things
 */

var ibeacon = require('./ibeacon.js');
var airdrop = require('./airdrop.js');
var airplay = require('./airplay.js');
var service = require('./service.js');


/**
 * Parse BLE advertiser manufacturer specific data for Apple.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data.substr(0);

  // TODO: handle and decipher service type 0x01

  // Apple sometimes includes more than one service data
  while(data && (data !== '')) {
    var appleType = data.substr(0,2);

    // Service types 0x02 and higher all seem to include length as second byte
    if(parseInt(appleType,16) >= 2) {
      var length = parseInt(data.substr(2,2),16);

      switch(appleType) {
        case '02':
          ibeacon.process(advertiserData);
          break;
        case '05':
          airdrop.process(advertiserData);
          break;
        case '08':
          service.process(advertiserData); // TODO: decipher observed service
          break;
        case '09':
          service.process(advertiserData); // TODO: decipher observed service
          break;
        case '0a':
          airplay.process(advertiserData);
          break;
        case '0c':
          service.process(advertiserData); // TODO: decipher observed service
          break;
        case '10':
          service.process(advertiserData); // TODO: decipher observed service
          break;
        default:
          service.process(advertiserData);
      }

      data = data.substr(4 + (length * 2)); // Trim down to any remaining data
    }
  }
}


module.exports.ibeacon = ibeacon;
module.exports.airdrop = airdrop;
module.exports.airplay = airplay;
module.exports.service = service;
module.exports.process = process;
