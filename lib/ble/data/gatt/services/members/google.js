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
  var schemePrefix = data.substr(4,2);
  uriBeacon.url = parseSchemePrefix(schemePrefix);
  var encodedUrl = data.substr(6);
  uriBeacon.url += parseEncodedUrl(encodedUrl);

  advertiserData.serviceData.uriBeacon = uriBeacon;
}


 
/**
 * Parse BLE advertiser Eddystone data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function processEddystone(advertiserData) {
  var data = advertiserData.serviceData.data;
  var eddystone = {};

  var frameType = data.substr(0,2);

  switch(frameType) {

    // UID
    case '00':
      eddystone.type = 'UID';
      eddystone.txPower = pdu.convertTxPower(data.substr(2,2));
      eddystone.uid = {};
      eddystone.uid.namespace = data.substr(4,20);
      eddystone.uid.instance = data.substr(24,12);
      break;

    // URI
    case '10':
      eddystone.type = 'URL';
      eddystone.txPower = pdu.convertTxPower(data.substr(2,2));
      eddystone.url = parseSchemePrefix(data.substr(4,2));
      eddystone.url += parseEncodedUrl(data.substr(6));
      break;

    // TLM
    case '20':
      eddystone.type = 'TLM';
      eddystone.version = data.substr(2,2);
      if(eddystone.version === '00') {
        eddystone.batteryVoltage = parseInt(data.substr(4,4),16) + 'mV';
        // TODO: export 8:8 fixed point representation interpreter to pdu
        eddystone.temperature = parseInt(data.substr(8,4),16);
        if(eddystone.temperature > 0x7fff) {
          eddystone.temperature = 0x7fff - eddystone.temperature;
        }
        eddystone.temperature = (eddystone.temperature / 256) + 'C';
        eddystone.advertisingCount = parseInt(data.substr(12,8),16);
        eddystone.uptime = (parseInt(data.substr(20,8),16) / 10) + 's';
      }
      else if(eddystone.version === '01') {
        eddystone.etlm = data.substr(4,24);
        eddystone.salt = data.substr(28,4);
        eddystone.mic = data.substr(32,4);
      }
      break;

    // EID
    case '30':
      eddystone.type = 'EID';
      eddystone.txPower = pdu.convertTxPower(data.substr(2,2));
      eddystone.eid = data.substr(4,16);
      break;
  }

  advertiserData.serviceData.eddystone = eddystone;
}


/**
 * Parse the scheme prefix from a URL.
 * @param {String} schemePrefix The scheme prefix code as a hexadecimal string.
 * @return {String} The scheme prefix of the URL.
 */
function parseSchemePrefix(schemePrefix) {
  var url;

  switch(schemePrefix) {
    case '00':
      url = "http://www.";
      break;
    case '01':
      url = "https://www.";
      break;
    case '02':
      url = "http://";
      break;
    case '03':
      url = "https://";
      break;
    default:
  }

  return url;
}


/**
 * Parse encoded URL.
 * @param {String} encodedUrl The encoded URL as a hexadecimal string.
 * @return {String} The suffix of the URL.
 */
function parseEncodedUrl(encodedUrl) {
  var url = '';

  for(var cChar = 0; cChar < (encodedUrl.length / 2); cChar++) {
    var charCode = parseInt(encodedUrl.substr(cChar*2,2),16);
    switch(charCode) {
      case 0x00:
        url += ".com/";
        break;
      case 0x01:
        url += ".org/";
        break;
      case 0x02:
        url += ".edu/";
        break;
      case 0x03:
        url += ".net/";
        break;
      case 0x04:
        url += ".info/";
        break;
      case 0x05:
        url += ".biz/";
        break;
      case 0x06:
        url += ".gov/";
        break;
      case 0x07:
        url += ".com";
        break;
      case 0x08:
        url += ".org";
        break;
      case 0x09:
        url += ".edu";
        break;
      case 0x0a:
        url += ".net";
        break;
      case 0x0b:
        url += ".info";
        break;
      case 0x0c:
        url += ".biz";
        break;
      case 0x0d:
        url += ".gov";
        break;
      default:
        url += String.fromCharCode(charCode);
    }
  }

  return url;
}


module.exports.process = process;
