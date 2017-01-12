/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var snfsingle = require('./snfsingle.js');
var snsmotion = require('./snsmotion.js');


/**
 * Parse BLE advertiser manufacturer specific data for StickNFind.
 * @param {Object} manufacturerSpecificData The object containing all parsed data.
 */
function process(manufacturerSpecificData) {
  var data = manufacturerSpecificData.data;
  var packetType = data.substr(0,2);

  switch(packetType) {
    case '01':
      snfsingle.process(manufacturerSpecificData);
      break;
    case '42':
      snsmotion.process(manufacturerSpecificData);
      break;
    default:
  }
}


module.exports.process = process;
