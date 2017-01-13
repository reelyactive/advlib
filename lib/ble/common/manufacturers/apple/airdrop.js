/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse Apple AirDrop manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var airdrop = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var length = parseInt(data.substr(2,2),16);

  airdrop.length = length;
  airdrop.data = data.substr(4, length * 2); // TODO: decipher the data

  advertiserData.manufacturerSpecificData.airdrop = airdrop;
}


module.exports.process = process;
