/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

/**
 * Convert a raw Bluetooth Low Energy advertiser header into its meaningful
 * parts.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {Object} Semantically meaningful advertiser header.
 */
function process(payload) {
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
      type = "ADV_IND";
      break;
    case("1"):
      type = "ADV_DIRECT_IND";
      break;
    case("2"):
      type = "ADV_NONCONNECT_IND";
      break;
    case("3"):
      type = "SCAN_REQ";
      break;
    case("4"):
      type = "SCAN_RSP";
      break;
    case("5"):
      type = "CONNECT_REQ";
      break;
    case("6"):
      type = "ADV_DISCOVER_IND";
      break;
    default: 
      type = "UNRECOGNISED";
  }
  return { type: type,
           length: length,
           txAdd: txAdd,
           rxAdd: rxAdd
  };
}

module.exports.process = process;