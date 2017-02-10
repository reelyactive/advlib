/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse Apple nearby manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 * @param {Number} cursor The current index into the raw data.
 */
function process(advertiserData, cursor) {
  var nearby = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var length = parseInt(data.substr(cursor + 2, 2), 16);

  nearby.length = length;
  nearby.data = data.substr(cursor + 4, length * 2); // TODO: decipher

  advertiserData.manufacturerSpecificData.nearby = nearby;

  return cursor + 4 + (length * 2);
}


module.exports.process = process;
