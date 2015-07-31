/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */


var flags = require('./gap/flags.js');
var uuid = require('./gap/uuid.js');
var localname = require('./gap/localname.js');
var txpower = require('./gap/txpower.js');
var slaveconnectionintervalrange = 
                             require('./gap/slaveconnectionintervalrange.js');
var solicitation = require('./gap/solicitation.js');
var servicedata = require('./gap/servicedata.js');
var genericdata = require('./gap/genericdata.js');
var manufacturerspecificdata = require('./gap/manufacturerspecificdata.js');


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
    switch(tag) {
      case("01"):
        flags.process(payload, cursor, advertiserData);
        break;
      case("02"):
         uuid.nonComplete16BitUUIDs.process(payload, cursor, advertiserData);
        break;
      case("03"):
        uuid.complete16BitUUIDs(payload, cursor, advertiserData);
        break;
      case("04"):
        genericdata.process(payload, cursor, advertiserData,
                            "nonComplete32BitUUIDs");
        break;
      case("05"):
        genericdata.process(payload, cursor, advertiserData,
                            "complete32BitUUIDs");
        break;
      case("06"):
        uuid.nonComplete128BitUUIDs(payload, cursor, advertiserData);
        break;
      case("07"):
        uuid.complete128BitUUIDs(payload, cursor, advertiserData);
        break;
      case("08"):
        localname.shortenedLocalName(payload, cursor, advertiserData);
        break;
      case("09"):
        localname.completeLocalName(payload, cursor, advertiserData);
        break;
      case("0a"):
        txpower.process(payload, cursor, advertiserData);
        break;
      case("0d"):
        genericdata.process(payload, cursor, advertiserData, "classOfDevice");
        break;
      case("0e"):
        genericdata.process(payload, cursor, advertiserData,
                            "simplePairingHashC");
        break;
      case("0f"):
        genericdata.process(payload, cursor, advertiserData,
                            "simplePairingRandomizerR");
        break;
      case("10"):
        genericdata.process(payload, cursor, advertiserData,
                            "securityManagerTKValue");
        break;
      case("11"):
        genericdata.process(payload, cursor, advertiserData,
                            "securityManagerOOBFlags");
        break;
      case("12"):
        slaveconnectionintervalrange.process(payload, cursor, advertiserData);
        break;
      case("14"):
        solicitation.solicitation16BitUUIDs(payload, cursor, advertiserData);
        break;
      case("15"):
        solicitation.solicitation128BitUUIDs(payload, cursor, advertiserData);
        break;
      case("16"):
        servicedata.process(payload, cursor, advertiserData);
        break;
      case("17"):
        genericdata.process(payload, cursor, advertiserData, 
                            "publicTargetAddress");
        break;
      case("18"):
        genericdata.process(payload, cursor, advertiserData, 
                            "randomTargetAddress");
        break;
      case("19"):
        genericdata.process(payload, cursor, advertiserData, "appearance");
        break;
      case("1a"):
        genericdata.process(payload, cursor, advertiserData, 
                            "advertisingInterval");
        break;
      case("1b"):
        genericdata.process(payload, cursor, advertiserData, 
                            "leBluetoothDeviceAddress");
        break;
      case("1c"):
        genericdata.process(payload, cursor, advertiserData, "leRole");
        break;
      case("1d"):
        genericdata.process(payload, cursor, advertiserData, 
                            "simplePairingHashC256");
        break;
      case("1e"):
        genericdata.process(payload, cursor, advertiserData, 
                            "simplePairingRandomizerR256");
        break;
      case("1f"):
        genericdata.process(payload, cursor, advertiserData,
                            "solicitation32BitUUIDs");
        break;
      case("3d"):
        genericdata.process(payload, cursor, advertiserData,
                            "informationData3D");
        break;
      case("ff"):
        manufacturerspecificdata.process(payload, cursor, advertiserData);
        break;
      default:
        //console.log("Unhandled BLE tag " + tag);
    }
    cursor += length;
  }
  return advertiserData;
}

module.exports.process = process;
