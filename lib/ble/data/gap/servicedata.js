/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var gattservices = require('../gatt/services/index.js');


/**
 * Parse BLE advertiser service data.
 * @param {string} data The raw service data as a hexadecimal-string.
 */
function process(data) {
  var uuid = data.substr(2,2) + data.substr(0,2);

  // NOTE: this is for legacy compatibility
  var advertiserData = {
    serviceData: {
      uuid: uuid,
      data: data.substr(4)
    }
  };

  gattservices.process(advertiserData);

  return advertiserData.serviceData;
}


module.exports.process = process;
