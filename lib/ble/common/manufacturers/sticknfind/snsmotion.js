/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var pdu = require('../../util/pdu.js');


/**
 * Parse StickNSense 'motion' manufacturer specific data.
 * @param {Object} manufacturerSpecificData The object containing all parsed data.
 */
function process(manufacturerSpecificData) {
  var snfBeacon = {};
  var data = manufacturerSpecificData.data;

  snfBeacon.type = 'SnS Motion';
  snfBeacon.timestamp = parseInt(pdu.reverseBytes(data.substr(2,8)),16);
  snfBeacon.temperature = parseInt(data.substr(10,2),16);
  if(snfBeacon.temperature > 127) {
    snfBeacon.temperature = 127 - snfBeacon.temperature;
  }
  snfBeacon.temperature = snfBeacon.temperature / 2;
  snfBeacon.temperature += (parseInt(data.substr(41,1),16)) / 4;
  snfBeacon.batteryVoltage = data.substr(12,2);
  snfBeacon.eventCounters = [];
  snfBeacon.eventCounters.push(data.substr(26,1) + data.substr(14,2));
  snfBeacon.eventCounters.push(data.substr(27,1) + data.substr(16,2));
  snfBeacon.eventCounters.push(data.substr(28,1) + data.substr(18,2));
  snfBeacon.eventCounters.push(data.substr(29,1) + data.substr(20,2));
  snfBeacon.eventCounters.push(data.substr(30,1) + data.substr(22,2));
  snfBeacon.eventCounters.push(data.substr(31,1) + data.substr(24,2));
  for(var cCounter = 0; cCounter < 6; cCounter++) {
    var hexStringCount = snfBeacon.eventCounters[cCounter];
    snfBeacon.eventCounters[cCounter] = parseInt(hexStringCount,16);
  }
  snfBeacon.accelerationX = parseInt((data.substr(32,2) +
                                      data.substr(38,1)), 16);
  snfBeacon.accelerationY = parseInt((data.substr(34,2) +
                                      data.substr(39,1)), 16);
  snfBeacon.accelerationZ = parseInt((data.substr(36,2) +
                                      data.substr(40,1)), 16);

  manufacturerSpecificData.snfBeacon = snfBeacon;
}


module.exports.process = process;
