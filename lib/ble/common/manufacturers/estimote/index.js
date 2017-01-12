/**
 * Copyright reelyActive 2016
 * We believe in an open Internet of Things
 */

var nearable = require('./nearable.js');


/**
 * Parse BLE advertiser manufacturer specific data for Estimote.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(manufacturerSpecificData) {
  var data = manufacturerSpecificData.data;
  var packetType = data.substr(0,2);

  switch(packetType) { // Update when we have manufacturer documentation
    case '01':
    default:
      nearable.process(manufacturerSpecificData);
  }
}


module.exports.process = process;
