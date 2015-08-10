/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var snfsingle = require('./snfsingle.js');
var snsmotion = require('./snsmotion.js');


/**
 * Parse BLE advertiser manufacturer specific data for StickNFind.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var data = advertiserData.manufacturerSpecificData.data;
  var packetType = data.substr(0,2);

  switch(packetType) {
    case '01':
      snfsingle.process(advertiserData);
      break;
    case '42':
      snsmotion.process(advertiserData);
      break;
    default:
  }
}


module.exports.process = process;
