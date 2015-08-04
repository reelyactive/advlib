/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var memberservices = 
                  require('../../../common/assignednumbers/memberservices.js');
var google = require('./members/google.js');


var MEMBERS_MAX_UUID = 0xfeff;
var MEMBERS_MIN_UUID = 0xfd00;


/**
 * Parse BLE advertiser data for GATT services.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var uuid = parseInt(advertiserData.serviceData.uuid, 16);
  var isMemberService = (uuid > MEMBERS_MIN_UUID) && (uuid < MEMBERS_MAX_UUID);

  // Member Services
  if(isMemberService) {

    // Look up the company name
    if(memberservices.companyNames.hasOwnProperty(uuid)) {
      advertiserData.serviceData.companyName =
                  memberservices.companyNames[advertiserData.serviceData.uuid];
    }

    // Member Service processing ordered by UUID assignment date
    switch(uuid) {
      case('fed8'):
      case('feaa'):
        google.process(advertiserData);
        break;
      default:
    }
  }

  // All other GATT Services
  else {

    // Service processing ordered by UUID value
    switch(uuid) {
      // TODO: cases
      default:
    }
  }
}


module.exports.process = process;
