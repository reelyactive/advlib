/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var servicedata = require('./servicedata.js');
var manufacturerspecificdata = require('./manufacturerspecificdata.js');

function process(companyIdentifierCode,serviceData,device) {
//var companyIdentifierCode = manufacturerspecificdata.process.companyIdentifierCode;
//var serviceData = servicedata.process;
      switch(companyIdentifierCode) {
        case "004c": // Apple inc.
          device.url = "http://reelyactive.com/metadata/apple.json";
          break;
        case "008c": // Gimbal inc.
          device.url = "http://reelyactive.com/metadata/gimbal.json";
          break;
      }
      switch(serviceData) {
        case "fee6":  // Seed
          device.url = "http://reelyactive.com/metadata/seedlabs.json";
          break;
      }
}

module.exports.process = process;