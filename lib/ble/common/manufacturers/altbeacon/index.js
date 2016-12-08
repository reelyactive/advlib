/**
 * Copyright reelyActive 2015-2016
 * We believe in an open Internet of Things
 */

//var ibeacon = require('./ibeacon.js');


/**
 * Parse BLE advertiser manufacturer specific data for Apple.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(manufacturerSpecificData) {

var data = manufacturerSpecificData.data;

  var beaconId = data.substr(4,40);
  var rssi = data.substr(44, 2);
  var reserved = data.substr(46, 2);

  manufacturerSpecificData.altbeacon = {beaconId: beaconId, refRSSI: rssi, reserved: reserved};
}


module.exports.process = process;
