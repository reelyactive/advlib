/**
 * Copyright reelyActive 2018
 * We believe in an open Internet of Things
 */


var flags = require('./flags.js');
var uuid = require('./uuid.js');
var localname = require('./localname.js');
var txpower = require('./txpower.js');
var solicitation = require('./solicitation.js');
var servicedata = require('./servicedata.js');
var manufacturerspecificdata = require('./manufacturerspecificdata.js');


/**
 * Convert a raw Bluetooth Low Energy advertising packet into its meaningful
 * parts.
 * https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
 * @param {string} payload The raw payload as a hexadecimal-string.
 * @return {Object} Semantically meaningful advertising packet.
 */
function process(payload) {
  var advertiserDataLength = payload.length;
  var cursor = 0;
  var advertiserData = {};
  while(cursor < advertiserDataLength) {
    var length = (parseInt(payload.substr(cursor,2),16) + 1) * 2;
    var tag = payload.substr(cursor + 2, 2);
    var data = payload.substr(cursor + 4, length - 4);
    switch(tag) {
      case("01"):
        advertiserData.flags = flags.process(data);
        break;
      case("02"):
        advertiserData.nonComplete16BitUUIDs = uuid.process(data);
        break;
      case("03"):
        advertiserData.complete16BitUUIDs = uuid.process(data);
        break;
      case("04"):
        advertiserData.nonComplete32BitUUIDs = uuid.process(data);
        break;
      case("05"):
        advertiserData.complete32BitUUIDs = uuid.process(data);
        break;
      case("06"):
        advertiserData.nonComplete128BitUUIDs = uuid.process(data);
        break;
      case("07"):
        advertiserData.complete128BitUUIDs = uuid.process(data);
        break;
      case("08"):
        advertiserData.shortenedLocalName = localname.process(data);
        break;
      case("09"):
        advertiserData.completeLocalName = localname.process(data);
        break;
      case("0a"):
        advertiserData.txPower = txpower.process(data);
        break;
      case("0d"):
        advertiserData.classOfDevice = data;
        break;
      case("0e"):
        advertiserData.simplePairingHashC = data;
        break;
      case("0f"):
        advertiserData.simplePairingRandomizerR = data;
        break;
      case("10"):
        advertiserData.securityManagerTKValue = data;
        break;
      case("11"):
        advertiserData.securityManagerOOBFlags = data;
        break;
      case("12"):
        advertiserData.slaveConnectionIntervalRange = data;
        break;
      case("14"):
        advertiserData.solicitation16BitUUIDs = solicitation.process(data);
        break;
      case("15"):
        advertiserData.solicitation128BitUUIDs = solicitation.process(data);
        break;
      case("16"):
        advertiserData.serviceData = servicedata.process(data);
        break;
      case("17"):
        advertiserData.publicTargetAddress = data;
        break;
      case("18"):
        advertiserData.randomTargetAddress = data;
        break;
      case("19"):
        advertiserData.appearance = data;
        break;
      case("1a"):
        advertiserData.advertisingInterval = data;
        break;
      case("1b"):
        advertiserData.leBluetoothDeviceAddress = data;
        break;
      case("1c"):
        advertiserData.leRole = data;
        break;
      case("1d"):
        advertiserData.simplePairingHashC256 = data;
        break;
      case("1e"):
        advertiserData.simplePairingRandomizerR256 = data;
        break;
      case("1f"):
        advertiserData.solicitation32BitUUIDs = data;
        break;
      case("3d"):
        advertiserData.informationData3D = data;
        break;
      case("ff"):
        advertiserData.manufacturerSpecificData =
                                       manufacturerspecificdata.process(data);
        break;
      default:
        //console.log("Unhandled BLE tag " + tag);
    }
    cursor += length;
  }
  return advertiserData;
}

module.exports.process = process;
module.exports.flags = flags;
module.exports.uuid = uuid;
module.exports.localname = localname;
module.exports.txpower = txpower;
module.exports.solicitation = solicitation;
module.exports.servicedata = servicedata;
module.exports.manufacturerspecificdata = manufacturerspecificdata;
