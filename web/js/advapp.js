var advlib = require('advlib');
var angular = require('angular');

module.exports = angular.module('advapp', ['ui.bootstrap'])

  // ----- Interaction controller -----
  .controller("InteractionCtrl", function($scope) {

  })


  // ----- Bluetooth controller -----
  .controller("BluetoothCtrl", function($scope) {
    $scope.bluetooth = {}; // TODO: remove once removed from index.html
    $scope.packet = {};
    $scope.presets = [{
      name: "reelyActible",
      payload: "421655daba50e1fe0201050c097265656c79416374697665"
    }, {
      name: "Apple TV",
      payload: "0015415df17b209c02011a0bff4c0009060202c0a8006a"
    }, {
      name: "Roximity",
      payload: "42243cae3eb8ebe00201061aff4c0002158deefbb9f7384297804096668bb4428100012258c5"
    }, {
      name: "UriBeacon",
      payload: "4220f60032be32c20201040303d8fe1216d8fe00f2027265656c7961637469766507"
    }, {
      name: "Tile",
      payload: "400dc3dc80ee20e40201060303edfe"
    }, {
      name: "Bright Beacon",
      payload: "40241582727dbefb0201061aff4c000215e2c56db5dffb48d2b060d0f5a71096e0fbbe7d72bf0040"
    }, {
      name: "Xiaomi Mi Band",
      payload: "0013dd748d100f880201060502e0fee7fe03094d490041"
    }, {
      name: "Estimote",
      payload: "4024a4b9297143fb0201061aff4c000215b9407f30f5f8466eaff925556b57fe6d03510003b60035"
    }, {
      name: "Fitbit",
      payload: "4025b2a86b4f01d90201041106ba5689a6fabfa2bd01467d6e00fbabad09160a181204eb150000"
    }, {
      name: "Kontakt.io",
      payload: "402494eb4ce223ea0201061aff4c000215f7826da64fa24e988024bc5b71e0893ef7e84be5b30036"
    }, {
      name: "reelyActive Bluetooth Smart reelceiver (RA-R436)",
      payload: "061b9e5ed0f7b13402010611074449555520657669746341796c656572"
    }];

    $scope.headerType = [
      { name: 'ADV_IND' },
      { name: 'ADV_DIRECT_IND' },
      { name: 'ADV_NONCONNECT_IND' },
      { name: 'SCAN_REQ' },
      { name: 'SCAN_RSP' },
      { name: 'CONNECT_REQ' },
      { name: 'ADV_DISCOVER_IND' },
      { name: 'UNRECOGNISED' }
    ];

    $scope.process = function(item, event) {
      $scope.packet = advlib.ble.process($scope.payload);
      $scope.json = JSON.stringify($scope.packet, null, "  ");
      $scope.elements = createElements($scope.payload, $scope.packet);
    }

    function createElements(payload, packet) {
      var elements = {};
      elements.header = createElementsHeader(payload, packet);
      elements.address = createElementsAddress(payload, packet);
      elements.data = createElementsData(payload, packet);
      return elements;
    }

    function createElementsHeader(payload, packet) {
      var header = {};
      header.value = payload.substr(0, 4);
      header.type = packet.advHeader.type;
      header.rxAdd = packet.advHeader.rxAdd;
      header.txAdd = packet.advHeader.txAdd;
      header.lengthInBytes = packet.advHeader.lengthInBytes;
      return header;
    }

    function createElementsAddress(payload, packet) {
      var address = {};
      address.value = packet.value;
      return address;
    }
        
    function createElementsData(payload, packet) {
      var data = {};
      data.value = $scope.payload.substr(16);

      var advData = $scope.packet.advData;

      for (var key in advData) {
        if (advData.hasOwnProperty(key)) {
          switch(key) {
            case("nonComplete16BitUUIDs"):
            case("complete16BitUUIDs"):
            case("nonComplete128BitUUIDs"):
            case("complete128BitUUIDs"):
              createElementsDataUuid(packet, data);
              break;
            case("completeLocalName"):
            case("shortenedLocalName"):
              createElementsDataLocalName(packet, data);
              break;
            case("flags"):
              createElementsDataFlags(packet, data);
              break;
            case("manufacturerSpecificData"):
              createElementsDataManufacturerSpecificData(packet, data);
              break;
            case("txPower"):
              createElementsDataTxPower(packet, data);
              break;
            case("serviceSolicitation"):
              createElementsDataServiceSolicitation(packet, data);
              break;
            case("serviceData"):
              createElementsDataServiceData(packet, data);
              break;
            default:
          }
        }
      }
      return data;
    }

    function createElementsDataUuid(packet, data) {
      var uuid = {};
      uuid.nonComplete16BitUUIDs = packet.advData.nonComplete16BitUUIDs;
      uuid.complete16BitUUIDs = packet.advData.complete16BitUUIDs;
      uuid.nonComplete128BitUUIDs = packet.advData.nonComplete128BitUUIDs;
      uuid.complete128BitUUIDs = packet.advData.complete128BitUUIDs;
      data.uuid = uuid;
    }

    function createElementsDataLocalName(packet, data) {
      var localName = {};
      localName.completeLocalName = packet.advData.completeLocalName;
      localName.shortenedLocalName = packet.advData.shortenedLocalName;
      data.localName = localName;
    }

    function createElementsDataFlags(packet, data) {
      var flagArray = [ 
        {name: advlib.ble.data.flags.BIT0_NAME, set: false}, 
        {name: advlib.ble.data.flags.BIT1_NAME, set: false},
        {name: advlib.ble.data.flags.BIT2_NAME, set: false},
        {name: advlib.ble.data.flags.BIT3_NAME, set: false},
        {name: advlib.ble.data.flags.BIT4_NAME, set: false},
        {name: advlib.ble.data.flags.BIT5_NAME, set: false},
      ];
      for(var bit in flagArray) {
        var flags = $scope.packet.advData.flags;
        var name = flagArray[bit].name;
        for(var flag in flags) {
          if(flags[flag] === name) {
            flagArray[bit].set = true;
          }
        }
      }
      data.flags = flagArray;
    }

    function createElementsDataManufacturerSpecificData(packet, data) {
      var manufacturerSpecificData = {};
      manufacturerSpecificData.companyName = packet.advData.manufacturerSpecificData.companyName;
      manufacturerSpecificData.companyIdentifierCode = packet.advData.manufacturerSpecificData.companyIdentifierCode;
      manufacturerSpecificData.data = packet.advData.manufacturerSpecificData.data;

      if(typeof(packet.advData.manufacturerSpecificData.iBeacon) !== 'undefined') {
        var iBeacon = {};
        iBeacon.uuid = packet.advData.manufacturerSpecificData.iBeacon.uuid;
        iBeacon.major = packet.advData.manufacturerSpecificData.iBeacon.major;
        iBeacon.minor = packet.advData.manufacturerSpecificData.iBeacon.minor;
        iBeacon.txPower = packet.advData.manufacturerSpecificData.iBeacon.txPower;
        iBeacon.licenseeName = packet.advData.manufacturerSpecificData.iBeacon.licenseeName;
        manufacturerSpecificData.iBeacon = iBeacon;
      }

      data.manufacturerSpecificData = manufacturerSpecificData;
    }

    function createElementsDataTxPower(packet, data) {
      var txPower = {};
      txPower.value = packet.advData.txPower;
      data.txPower = txPower;
    }

    function createElementsDataServiceSolicitation(packet, data) {
      var serviceSolicitation = {};
      serviceSolicitation.solicitation16BitUUIDs = packet.advData.solicitation16BitUUIDs;
      serviceSolicitation.solicitation128BitUUIDs = packet.advData.solicitation128BitUUIDs;
      data.serviceSolicitation = serviceSolicitation;
    }

    function createElementsDataServiceData(packet, data) {
      var serviceData = {};
      serviceData.uuid = packet.advData.serviceData.uuid;
      serviceData.data = packet.advData.serviceData.data;
      serviceData.companyName = packet.advData.serviceData.companyName;
      serviceData.specificationName = packet.advData.serviceData.specificationName;

      if(typeof(packet.advData.serviceData.uriBeacon) !== 'undefined') {
        var uriBeacon = {};
        uriBeacon.txPower = packet.advData.serviceData.uriBeacon.txPower;
        uriBeacon.url = packet.advData.serviceData.uriBeacon.url;
        serviceData.uriBeacon = uriBeacon;
      }

      data.serviceData = serviceData;
    }      
        
  })

  // ----- reelyActive controller -----
  .controller("ReelyactiveCtrl", function($scope) {
    $scope.reelyactive = {}; // TODO: remove once removed from index.html
    $scope.packet = {};
    $scope.presets = [
      { name: "Tag Identification Blink",
        payload: "1234567c" },
      { name: "Tag Sensor Blink",
        payload: "123456742029" }
    ];

    $scope.process = function(item, event) {
      $scope.packet = advlib.reelyactive.process($scope.payload);
      $scope.json = JSON.stringify($scope.packet, null, "  ");
    }
  });

  // window.MYSCOPE = $scope; // In order to access scope on console (to be removed when not testing)
