/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var ibeacon = require('./ibeacon.js');


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
    case '09':
      // TODO: processAppleTV and/or whatever else uses this
      break;
    default:
  }
}


module.exports.process = process;
