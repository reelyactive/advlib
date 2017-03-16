/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse BLE advertiser data for Google data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {

  switch(advertiserData.serviceData.uuid) {
    case('fe9a'):
      processService(advertiserData);
      break;
    default:
  }
}


/**
 * Parse Estimote service data
 * @param {string} data The raw service data as a hexadecimal-string.
 */
function processService(advertiserData) {
  var data = advertiserData.serviceData.data;
  var estimote = {};

  var type = data.substr(0,2);
  estimote.id = data.substr(2,16);

  switch(type) {
    case '00':
      estimote.type = 'location';
      estimote.payload = data.substr(18,22);
      break;
    case '12':
      estimote.type = 'telemetry';
      var subtype = data.substr(18,2);
      estimote.subtype = subtype;
      if(subtype === '00') {
        estimote.accelerationX = toAcceleration(data.substr(20,2));
        estimote.accelerationY = toAcceleration(data.substr(22,2));
        estimote.accelerationZ = toAcceleration(data.substr(24,2));
        estimote.statusBytes = [ data.substr(26,2), data.substr(28,2),
                                 data.substr(30,2), data.substr(32,2) ];
      }
      else if(subtype === '01') {
        estimote.payload = data.substr(20,20);
      }
      break;
    default:
      estimote.type = type;
      estimote.payload = data.substr(18);
  }

  advertiserData.serviceData.estimote = estimote;
}


/**
 * Convert the given twos complement hexadecimal string to acceleration in g.
 * @param {String} byte The acceleration data byte as a string.
 */
function toAcceleration(byte) {
  var data = parseInt(byte,16);
  if(data > 127) {
    return (data - 256) / 64;
  }
  return data / 64;
}


module.exports.process = process;
