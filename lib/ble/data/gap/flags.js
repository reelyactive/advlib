/**
 * Copyright reelyActive 2015-2018
 * We believe in an open Internet of Things
 */


var BIT0_NAME = 'LE Limited Discoverable Mode';
var BIT1_NAME = 'LE General Discoverable Mode';
var BIT2_NAME = 'BR/EDR Not Supported';
var BIT3_NAME = 'Simultaneous LE and BR/EDR to Same Device Capable (Controller)';
var BIT4_NAME = 'Simultaneous LE and BR/EDR to Same Device Capable (Host)';
var BIT5_NAME = 'Reserved';


/**
 * Parse BLE advertiser data flags.
 * @param {string} data The raw flag data as a hexadecimal-string.
 */
function process(data) {
  var flags = parseInt(data, 16);
  var result = [];
  if(flags & 0x01) {
    result.push(BIT0_NAME);
  }
  if(flags & 0x02) {
    result.push(BIT1_NAME);
  }
  if(flags & 0x04) {
    result.push(BIT2_NAME);
  }
  if(flags & 0x08) {
    result.push(BIT3_NAME);
  }
  if(flags & 0x10) {
    result.push(BIT4_NAME);
  }
  if(flags & 0x20) {
    result.push(BIT5_NAME);
  }
  return result;
}

module.exports.process = process;
module.exports.BIT0_NAME = BIT0_NAME;
module.exports.BIT1_NAME = BIT1_NAME;
module.exports.BIT2_NAME = BIT2_NAME;
module.exports.BIT3_NAME = BIT3_NAME;
module.exports.BIT4_NAME = BIT4_NAME;
module.exports.BIT5_NAME = BIT5_NAME;
