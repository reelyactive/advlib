/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse Apple AirPlay manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 * @param {Number} cursor The current index into the raw data.
 */
function process(advertiserData, cursor) {
  var airplay = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var length = parseInt(data.substr(cursor + 2, 2), 16);
  var role;

  switch(data.substr(cursor, 2)) {
    case '09':
      role = 'destination';
      break;
    case '0a':
      role = 'source';
      break;
    default:
      role = 'unknown';
  }

  airplay.length = length;
  airplay.role = role;
  airplay.data = data.substr(cursor + 4, length * 2); // TODO: decipher

  advertiserData.manufacturerSpecificData.airplay = airplay;

  return cursor + 4 + (length * 2);
}


module.exports.process = process;
