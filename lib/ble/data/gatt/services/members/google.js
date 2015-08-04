/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var pdu = require('../../../../common/util/pdu.js');


/**
 * Parse BLE advertiser data for Google data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {

  switch(advertiserData.serviceData.uuid) {
    case('feaa'):
      processEddystone(advertiserData);
      break;
    case("fed8"):
      processUriBeacon(advertiserData);
      break;
    default:
  }
}


/**
 * Parse BLE advertiser UriBeacon data. (from Google's Physical Web).
 * https://github.com/google/uribeacon/blob/master/specification/AdvertisingMode.md
 * @param {string} data The raw UriBeacon data as a hexadecimal-string.
 */
function processUriBeacon(advertiserData) {
  var data = advertiserData.serviceData.data;
  var uriBeacon = {};
  var flags = parseInt(data.substr(0,2),16);
  uriBeacon.invisibleHint = false;
  if(flags & 0x01) {
    uriBeacon.invisibleHint = true;
  }
  var rawTxPower = data.substr(2,2);
  uriBeacon.txPower = pdu.convertTxPower(rawTxPower);
  var schemePrefix = parseInt(data.substr(4,2),16);
  switch(schemePrefix) {
    case 0x00:
      uriBeacon.url = "http://www.";
      break;
    case 0x01:
      uriBeacon.url = "https://www.";
      break;
    case 0x02:
      uriBeacon.url = "http://";
      break;
    case 0x03:
      uriBeacon.url = "https://";
      break;
    case 0x03:
      uriBeacon.urnuuid = "urn:uuid:";
      break;
    default:
      break;
  }
  var encodedUri = data.substr(6);
  var uriString = "";
  for(var cChar = 0; cChar < (encodedUri.length / 2); cChar++) {
    var charCode = parseInt(encodedUri.substr(cChar*2,2),16);
    switch(charCode) {
      case 0x00:
        uriString += ".com/";
        break;
      case 0x01:
        uriString += ".org/";
        break;
      case 0x02:
        uriString += ".edu/";
        break;
      case 0x03:
        uriString += ".net/";
        break;
      case 0x04:
        uriString += ".info/";
        break;
      case 0x05:
        uriString += ".biz/";
        break;
      case 0x06:
        uriString += ".gov/";
        break;
      case 0x07:
        uriString += ".com";
        break;
      case 0x08:
        uriString += ".org";
        break;
      case 0x09:
        uriString += ".edu";
        break;
      case 0x0a:
        uriString += ".net";
        break;
      case 0x0b:
        uriString += ".info";
        break;
      case 0x0c:
        uriString += ".biz";
        break;
      case 0x0d:
        uriString += ".gov";
        break;
      default:
        uriString += String.fromCharCode(charCode);
    }
  }
  if(uriBeacon.url) {
    uriBeacon.url += uriString;
  }
  else if(uri.urnuuid) {
    uriBeacon.urnuuid += uriString;
  }
  advertiserData.serviceData.uriBeacon = uriBeacon;
}


 
/**
 * Parse BLE advertiser Eddystone data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processEddystone(advertiserData) {

  var dataType = advertiserData.serviceData.data.substr(2,2);
  var uuid = advertiserData.serviceData.data.substr(4,2);
  var frameType = advertiserData.serviceData.data.substr(8,2);

  advertiserData.serviceData.eddystone = {
                          dataType: dataType,
                          uuid: uuid, 
                          frameType: frameType };

  if(frameType === "00") {
    advertiserData.serviceData.eddystone.uid = {};
    advertiserData.serviceData.eddystone.uid.rangingData =
                                advertiserData.serviceData.data.substr(10,2); 
    advertiserData.serviceData.eddystone.uid.namespace =
                                advertiserData.serviceData.data.substr(12,20); 
    advertiserData.serviceData.eddystone.uid.instance =
                                advertiserData.serviceData.data.substr(32,12); 
  }

  else if(frameType === "10") {
    advertiserData.serviceData.eddystone.uri = {};
    advertiserData.serviceData.eddystone.uri.txPower =
                                advertiserData.serviceData.data.substr(10,2);
    advertiserData.serviceData.eddystone.uri.urlScheme =
                                advertiserData.serviceData.data.substr(12,2);
    advertiserData.serviceData.eddystone.uri.encodedUrl =
                                advertiserData.serviceData.data.substr(14,2);
  }

  else if(frameType === "20") {  
    advertiserData.serviceData.eddystone.tlm = {};
    advertiserData.serviceData.eddystone.tlm.tlmVersion =
                                advertiserData.serviceData.data.substr(10,2);
    advertiserData.serviceData.eddystone.tlm.vBatt =
                                advertiserData.serviceData.data.substr(12,4);
    advertiserData.serviceData.eddystone.tlm.temp =
                                advertiserData.serviceData.data.substr(16,4);
    advertiserData.serviceData.eddystone.tlm.advCnt =
                                advertiserData.serviceData.data.substr(20,8);
    advertiserData.serviceData.eddystone.tlm.secCnt =
                                advertiserData.serviceData.data.substr(28,8);
  } 

}


module.exports.process = process;
