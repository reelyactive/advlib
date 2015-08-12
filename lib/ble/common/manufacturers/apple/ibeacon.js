/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var pdu = require('../../util/pdu.js');


/**
 * List of all known licensees, expect frequent updates.
 * Kindly respect ascending order of UUIDs to facilitate verify-before-update!
 */ 
var licenseeNames = {
    "24ddf4118cf1440c87cde368daf9c93e": "RECO",
    "2f234454cf6d4a0fadf2f4911ba9ffa6": "Radius Networks",
    "3d4f13b4d1fd404980e5d3edcc840b69": "Orange S.A.",
    "8deefbb9f7384297804096668bb44281": "Roximity",
    "b9407f30f5f8466eaff925556b57fe6d": "Estimote",
    "dab59c4fa4d6ee286bfe8e0000bbc2bb": "eNote",
    "e2c56db5dffb48d2b060d0f5a71096e0": "Bright Beacon",
    "f0018b9b75094c31a9051a27d39c003c": "LocosLab",
    "f7826da64fa24e988024bc5b71e0893e": "Kontakt.io"
};


/**
 * Parse Apple iBeacon manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var iBeacon = {};
  var data = advertiserData.manufacturerSpecificData.data;

  iBeacon.uuid = data.substr(4,32);
  iBeacon.major = data.substr(36,4);
  iBeacon.minor = data.substr(40,4);
  iBeacon.txPower = pdu.convertTxPower(data.substr(44,2));

  var licenseeName = licenseeNames[iBeacon.uuid];
  if(typeof licenseeName === 'undefined') {
    licenseeName = 'Unknown';
  }
  iBeacon.licenseeName = licenseeName;

  advertiserData.manufacturerSpecificData.iBeacon = iBeacon;
}


module.exports.licenseeNames = licenseeNames;
module.exports.process = process;
