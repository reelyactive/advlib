/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var serviceData = require('../../../../gap/servicedata.js');
var google = require('./google/index.js');

// Look for uuid such as'feaa', etc and then go to ./google/eddystone.js to process 
// OR 
// if not go to table lookup and show companyName

 /**
 * Parse BLE advertiser data for gatt servive data.
 * @param {Object} advertiserData The object containing all parsed data.
 */

 function process(advertiserData) {

  var uuid = advertiserData.serviceData.uuid;
  var data = advertiserData.serviceData.data;
 
 switch(uuid) {
      case("feaa"):
        google.process(advertiserData);
        break;
      case("fed8"):
        google.process(advertiserData);
        break;
        default:
 }
 return advertiserData.serviceData;
 }

module.exports.process = process;
