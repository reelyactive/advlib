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
  var data = advertiserData.manufacturerSpecificData.data;
  var cursor = 0;

  // Apple sometimes includes more than one service data
  while(cursor < data.length) {
    var appleType = data.substr(cursor,2);

    switch(appleType) {
      case '01':
        return; // TODO: decipher this type (one bit set in fixed length?)
      case '02':
        cursor = ibeacon.process(advertiserData, cursor);
        break;
      case '05':
        cursor = airdrop.process(advertiserData, cursor);
        break;
      case '08':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '09':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '0a':
        cursor = airplay.process(advertiserData, cursor);
        break;
      case '0b':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '0c':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '10':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      default:
        return; // Don't trust types that haven't yet been observed
    }
  }
}


module.exports.ibeacon = ibeacon;
module.exports.airdrop = airdrop;
module.exports.airplay = airplay;
module.exports.service = service;
module.exports.process = process;
