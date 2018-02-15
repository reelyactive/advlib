/**
 * Copyright reelyActive 2017-2018
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

  if(type === 'a1') {
    minew.frameType = type;
    minew.productModel = parseInt(data.substr(2,2),16);

    switch(minew.productModel) {
      case 1:
        minew.batteryPercent = parseInt(data.substr(4,2),16);
        minew.temperature = toDecimal(data.substr(6,4));
        minew.humidity = toDecimal(data.substr(10,4));
        minew.macAddress = toMAC(data.substr(14,12));
        break;
      case 2:
        minew.batteryPercent = parseInt(data.substr(4,2),16);
        minew.visibleLight = ((parseInt(data.substr(6,2)) & 0x01) === 0x01);
        minew.macAddress = toMAC(data.substr(8,12));
        break;
      case 3:
        minew.batteryPercent = parseInt(data.substr(4,2),16);
        minew.accelerationX = toDecimal(data.substr(6,4));
        minew.accelerationY = toDecimal(data.substr(10,4));
        minew.accelerationZ = toDecimal(data.substr(14,4));
        minew.macAddress = toMAC(data.substr(18,12));
        break;
      case 8:
        minew.batteryPercent = parseInt(data.substr(4,2),16);
        minew.macAddress = toMAC(data.substr(6,12));
        minew.name = hexToString(data.substr(18));
        break;
      default:
        minew.frameType = type;
        minew.payload = data.substr(2);
    }
  }

  advertiserData.serviceData.minew = minew;
}


/**
 * Convert the given signed 8.8 fixed-point hexadecimal string to decimal.
 * @param {String} word The data word as a string.
 */
function toDecimal(word) {
  var integer = parseInt(word.substr(0,2),16);
  var decimal = parseInt(word.substr(2,2),16) / 256;

  if(integer > 127) {
    return (integer - 256) + decimal;
  }
  return integer + decimal;
}


/**
 * Convert the given hexadecimal string to a MAC address string.
 * @param {String} word The MAC data word as a string.
 */
function toMAC(word) {
  return word.substr(10,2) + ':' + word.substr(8,2) + ':' +
         word.substr(6,2) + ':' + word.substr(4,2) + ':' +
         word.substr(2,2) + ':' + word.substr(0,2);
}


/**
 * Convert the given hexadecimal string to an ASCII string.
 * @param {String} name The hexadecimal string.
 */
function hexToString(hex) {
  var name = '';
  for(var cByte = 0; cByte < hex.length; cByte += 2) {
    name += String.fromCharCode(parseInt(hex.substr(cByte, 2), 16));
  }

  return name;
}


module.exports.process = process;
