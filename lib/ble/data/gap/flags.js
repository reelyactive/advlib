/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 /**
 * Parse BLE advertiser data flags.
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @param {number} cursor The start index within the payload.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(payload, cursor, advertiserData) {
  var flags = parseInt(payload.substr(cursor+4,2),16);
  var result = [];
  if(flags & 0x01) {
    result.push("LE Limited Discoverable Mode");
  }
  if(flags & 0x02) {
    result.push("LE General Discoverable Mode");
  }
  if(flags & 0x04) {
    result.push("BR/EDR Not Supported");
  }
  if(flags & 0x08) {
    result.push("Simultaneous LE and BR/EDR to Same Device Capable (Controller)");
  }
  if(flags & 0x10) {
    result.push("Simultaneous LE and BR/EDR to Same Device Capable (Host)");
  }
  advertiserData.flags = result;
}

module.exports.process = process;