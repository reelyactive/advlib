/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var pdu = require('../../util/pdu.js');


/**
 * Parse StickNFind 'single payload' manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var snfBeacon = {};
  var data = advertiserData.manufacturerSpecificData.data;

  snfBeacon.type = 'V2 Single Payload';
  snfBeacon.id = pdu.reverseBytes(data.substr(2,16));
  snfBeacon.time = parseInt(pdu.reverseBytes(data.substr(18,8)),16);
  snfBeacon.scanCount = parseInt(data.substr(26,2),16) / 4;
  snfBeacon.batteryVoltage = data.substr(28,2);
  snfBeacon.temperature = parseInt(data.substr(30,2),16);
  if(snfBeacon.temperature > 127) {
    snfBeacon.temperature = 127 - snfBeacon.temperature;
  }
  snfBeacon.temperature += (parseInt(data.substr(26,2),16) % 4) / 4;
  snfBeacon.calibration = data.substr(32,2);
  snfBeacon.checksum = data.substr(34,6);

  advertiserData.manufacturerSpecificData.snfBeacon = snfBeacon;
}


module.exports.process = process;
