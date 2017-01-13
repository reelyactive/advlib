/**
 * Copyright reelyActive 2017
 * We believe in an open Internet of Things
 */


/**
 * Parse Apple unknown manufacturer specific data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {
  var service = {};
  var data = advertiserData.manufacturerSpecificData.data;
  var length = parseInt(data.substr(2,2),16);

  service.type = parseInt(data.substr(0,2),16);
  service.length = length;
  service.data = data.substr(4, length * 2);

  advertiserData.manufacturerSpecificData.service = service;
}


module.exports.process = process;
