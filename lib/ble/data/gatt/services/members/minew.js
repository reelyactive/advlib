/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse BLE advertiser data for Minew data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {

  switch(advertiserData.serviceData.uuid) {
    case('ffe1'):  // Not a legit member service, but that's what's transmitted
      processService(advertiserData);
      break;
    default:
  }
}


/**
 * Parse Minew service data
 * @param {string} data The raw service data as a hexadecimal-string.
 */
function processService(advertiserData) {
  var data = advertiserData.serviceData.data;
  var minew = {};

  var type = data.substr(0,2);

  switch(type) {
    case 'a1':
      minew.frameType = type;
      minew.productModel = parseInt(data.substr(2,2),16);
      minew.batteryPercent = parseInt(data.substr(4,2),16);
      minew.accelerationX = toAcceleration(data.substr(6,4));
      minew.accelerationY = toAcceleration(data.substr(10,4));
      minew.accelerationZ = toAcceleration(data.substr(14,4));
      minew.macAddress = data.substr(28,2) + ':' + data.substr(26,2) + ':' +
                         data.substr(24,2) + ':' + data.substr(22,2) + ':' +
                         data.substr(20,2) + ':' + data.substr(18,2);
      break;
    default:
      minew.frameType = type;
      minew.payload = data.substr(2);
  }

  advertiserData.serviceData.minew = minew;
}


/**
 * Convert the given twos complement hexadecimal string to acceleration in g.
 * @param {String} word The acceleration data word as a string.
 */
function toAcceleration(word) {
  var integer = parseInt(word.substr(0,2),16);
  var decimal = parseInt(word.substr(2,2),16) / 256;

  if(integer > 127) {
    return (integer - 256) + decimal;
  }
  return integer + decimal;
}


module.exports.process = process;
