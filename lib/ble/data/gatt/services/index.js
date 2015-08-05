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
  var uuid = advertiserData.serviceData.uuid;
  var isMemberService = (parseInt(uuid,16) > MEMBERS_MIN_UUID) &&
                        (parseInt(uuid,16) < MEMBERS_MAX_UUID);

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

  // Standard Services
  else {

    // Service processing ordered by UUID value
    switch(uuid) {
      case('1811'):
        alertnotificationservice.process(advertiserData);
        break;
      case('1815'):
        automationio.process(advertiserData);
        break;
      case('180f'):
        batteryservice.process(advertiserData);
        break;
      case('1810'):
        bloodpressure.process(advertiserData);
        break;
      case('181b'):
        bodycomposition.process(advertiserData);
        break;
      case('181e'):
        bondmanagement.process(advertiserData);
        break;
      case('181f'):
        continousglucosemonitoring.process(advertiserData);
        break;
      case('1805'):
        currenttimeservice.process(advertiserData);
        break;
      case('1818'):
        cyclingpower.process(advertiserData);
        break;
      case('1816'):
        cyclingspeedandcadence.process(advertiserData);
        break;
      case('180a'):
        deviceinformation.process(advertiserData);
        break;
      case('181a'):
        environmentalsensing.process(advertiserData);
        break;
      case('1800'):
        genericaccess.process(advertiserData);
        break;
      case('1801'):
        genericattribute.process(advertiserData);
        break;
      case('1808'):
        glucose.process(advertiserData);
        break;
      case('1809'):
        healththermometer.process(advertiserData);
        break;
      case('180d'):
        heartrate.process(advertiserData);
        break;
      case('1812'):
        humaninterfacedevice.process(advertiserData);
        break;
      case('1802'):
        immediatealert.process(advertiserData);
        break;
      case('1821'):
        indoorpositioning.process(advertiserData);
        break;
      case('1820'):
        internetprotocolsupport.process(advertiserData);
        break;
      case('1803'):
        linkloss.process(advertiserData);
        break;
      case('1819'):
        locationandnavigation.process(advertiserData);
        break;
      case('1807'):
        nextdstchangeservice.process(advertiserData);
        break;
      case('180e'):
        phonealertstatusservice.process(advertiserData);
        break;
      case('1822'):
        pulseoximeter.process(advertiserData);
        break;  
      case('1806'):
        referencetimeupdateservice.process(advertiserData);
        break;  
      case('1814'):
        runningspeedandcadence.process(advertiserData);
        break;  
      case('1813'):
        scanparameters.process(advertiserData);
        break;  
      case('1804'):
        txpower.process(advertiserData);
        break;  
      case('181c'):
        userdata.process(advertiserData);
        break;
      case('181d'):
        weightscale.process(advertiserData);
        break;                                                                      
      default:
    }
  }
}


module.exports.process = process;
