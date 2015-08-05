/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 /**
 * Parse BLE advertiser data for Standard Service Data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var uuid = advertiserData.serviceData.uuid;
  if(uuid === '1802') {
  	advertiserData.serviceData.standard = 'Immediate Alert';
  }
}

module.exports.process = process;
