/**
 * Copyright reelyActive 2015-2019
 * We believe in an open Internet of Things
 */


var TYPE0_NAME = 'ADV_IND';
var TYPE1_NAME = 'ADV_DIRECT_IND';
var TYPE2_NAME = 'ADV_NONCONNECT_IND';
var TYPE3_NAME = 'SCAN_REQ';
var TYPE4_NAME = 'SCAN_RSP';
var TYPE5_NAME = 'CONNECT_REQ';
var TYPE6_NAME = 'ADV_DISCOVER_IND';
var TYPE_UNDEFINED_NAME = 'UNRECOGNISED';


/**
 * Convert a raw Bluetooth Low Energy advertiser header into its meaningful
 * parts.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {Object} Semantically meaningful advertiser header.
 */
function process(payload) {
  payload = payload.toLowerCase();

  var addressType = parseInt(payload.substr(0,1),16);
  var typeCode = payload.substr(1,1);
  var length = parseInt(payload.substr(2,2),16) % 64;
  var rxAdd = "public";
  var txAdd = "public";
  if(addressType & 0x8) {
    rxAdd = "random";
  }
  if(addressType & 0x4) {
    txAdd = "random";
  }   
  var type;
  switch(typeCode) {
    case("0"):
      type = TYPE0_NAME;
      break;
    case("1"):
      type = TYPE1_NAME;
      break;
    case("2"):
      type = TYPE2_NAME;
      break;
    case("3"):
      type = TYPE3_NAME;
      break;
    case("4"):
      type = TYPE4_NAME;
      break;
    case("5"):
      type = TYPE5_NAME;
      break;
    case("6"):
      type = TYPE6_NAME;
      break;
    default: 
      type = TYPE_UNDEFINED_NAME;
  }
  return { type: type,
           length: length,
           txAdd: txAdd,
           rxAdd: rxAdd
  };
}


module.exports.process = process;
module.exports.TYPE0_NAME = TYPE0_NAME;
module.exports.TYPE1_NAME = TYPE1_NAME;
module.exports.TYPE2_NAME = TYPE2_NAME;
module.exports.TYPE3_NAME = TYPE3_NAME;
module.exports.TYPE4_NAME = TYPE4_NAME;
module.exports.TYPE5_NAME = TYPE5_NAME;
module.exports.TYPE6_NAME = TYPE6_NAME;
module.exports.TYPE_UNDEFINED_NAME = TYPE_UNDEFINED_NAME;
