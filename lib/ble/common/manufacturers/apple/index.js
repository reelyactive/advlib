/**
 * Copyright reelyActive 2015-2017
 * We believe in an open Internet of Things
 */

var ibeacon = require('./ibeacon.js');
var airdrop = require('./airdrop.js');
var airplay = require('./airplay.js');
var airpods = require('./airpods.js');
var handoff = require('./handoff.js');
var nearby = require('./nearby.js');
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
      case '07':
        cursor = airpods.process(advertiserData, cursor);
        break;
      case '08':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '09':
        cursor = airplay.process(advertiserData, cursor); 
        break;
      case '0a':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '0b':
        cursor = service.process(advertiserData, cursor); // TODO: decipher
        break;
      case '0c':
        cursor = handoff.process(advertiserData, cursor);
        break;
      case '10':
        cursor = nearby.process(advertiserData, cursor);
        break;
      default:
        return; // Don't trust types that haven't yet been observed
    }
  }
}


module.exports.ibeacon = ibeacon;
module.exports.airdrop = airdrop;
module.exports.airplay = airplay;
module.exports.handoff = handoff;
module.exports.nearby = nearby;
module.exports.service = service;
module.exports.process = process;
