/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 /**
 * Calculate the length of the data (flag excluded) of a BLE tag.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 */
function getTagDataLength(payload, cursor) {
  return (parseInt(payload.substr(cursor,2),16) - 1) * 2;
}

/**
 * Reverse the order of the bytes in the data.
 * @param {string} data The data as a hexadecimal-string.
 */
function reverseBytes(data) {
  var result = "";
  for(var cChar = (data.length - 2); cChar >= 0; cChar -= 2) {
    result += data.substr(cChar,2);
  }
  return result;
}

 /**
 * Convert raw txPower to dBm.
 * @param {string} rawTxPower The raw txPower as a hexadecimal-string.
 */
function convertTxPower(rawTxPower) {
  var txPower = parseInt(rawTxPower,16);
  if(txPower > 127) {
    txPower -= 256;
  }
  return txPower + "dBm";
}

module.exports.getTagDataLength = getTagDataLength;
module.exports.reverseBytes = reverseBytes;
module.exports.convertTxPower = convertTxPower;