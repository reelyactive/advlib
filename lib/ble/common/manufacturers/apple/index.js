/**
 * Copyright reelyActive 2015-2017
 * We believe in an open Internet of Things
 */

var ibeacon = require('./ibeacon.js');
var airdrop = require('./airdrop.js');
var airplay = require('./airplay.js');


/**
 * Parse BLE advertiser manufacturer specific data for Apple.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data;
  var appleType = data.substr(0,2);

  switch(appleType) {
    case '02':
      ibeacon.process(advertiserData);
      break;
    case '05':
      airdrop.process(advertiserData);
      break;
    case '09':
      // TODO: processAppleTV and/or whatever else uses this
      break;
    case '0a':
      airplay.process(advertiserData);
      break;
    default:
  }
}


module.exports.ibeacon = ibeacon;;
module.exports.airplay = airplay;
module.exports.process = process;
