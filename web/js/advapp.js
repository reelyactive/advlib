var advlib = require('advlib');
var angular = require('angular');

module.exports = angular.module('advapp', ['ui.bootstrap'])

// ----- Interaction controller -----

.controller("InteractionCtrl", function($scope) {
  $scope.payload = '';
  $scope.header = '';
  $scope.bluetooth = {
    show: true,
    tabclass: "selected-tab",
    packet: {},
    presets: {}
  };

  $scope.reelyactive = {
    show: false,
    tabclass: "tab",
    packet: {},
    presets: {}
  };

  $scope.packet = $scope.bluetooth.packet;
  $scope.packet = $scope.reelyactive.packet;
  $scope.presets = $scope.bluetooth.presets;
  $scope.presets = $scope.bluetooth.presets;

  $scope.show = {
    bluetooth: true,
    reelyactive: false
  };
  $scope.tabclass = {
    bluetooth: 'selected-tab',
    reelyactive: 'tab'
  };

  $scope.selectBluetooth = function() {
    $scope.bluetooth.show = true;
    $scope.bluetooth.tabclass = "selected-tab";
    $scope.reelyactive.show = false;
    $scope.reelyactive.tabclass = "tab";
    $scope.packet = $scope.bluetooth.packet;
    $scope.presets = $scope.bluetooth.presets;
  }

  $scope.selectReelyactive = function() {
    $scope.bluetooth.show = false;
    $scope.bluetooth.tabclass = "tab";
    $scope.reelyactive.show = true;
    $scope.reelyactive.tabclass = "selected-tab";
    $scope.packet = $scope.reelyactive.packet;
    $scope.presets = $scope.reelyactive.presets;
  }
})

// ----- Packet controller -----

.controller("PacketCtrl", function($scope) {
  $scope.bluetooth.presets = [{
    name: "reelyActible",
    payload: "421655daba50e1fe0201050c097265656c79416374697665"
  }, {
    name: "TrackR",
    payload: "40239dd02fcbafe20409746b7203194002020106020a0403033e0f09ff00009dd02fcbafe2"
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
    name: "Fitbit",
    payload: "4025b2a86b4f01d90201041106ba5689a6fabfa2bd01467d6e00fbabad09160a181204eb150000"
  }, {
    name: "reelyActive Bluetooth Smart reelceiver (RA-R436)",
    payload: "061b9e5ed0f7b13402010611074449555520657669746341796c656572"
  }];
  $scope.reelyactive.presets = [{
    name: "Tag Identification Blink",
    payload: "1234567c"
  }, {
    name: "Tag Sensor Blink",
    payload: "123456742029"
  }];

  $scope.process = function(item, event) {
    if ($scope.bluetooth.show) {
      $scope.bluetooth.packet = advlib.ble.process($scope.payload);
      $scope.packet = JSON.stringify($scope.bluetooth.packet, null, " ");

      // Defined for ng-keyup function process() calls
      $scope.header = $scope.payload.substr(0, 4);
      $scope.payloadData = $scope.payload.substring(16, $scope.payload.length -
        16);

      // Defined for Flags' array and Form Checkbox binding            
      var flags = $scope.bluetooth.packet.advData.flags
      $scope.checkedItems = {};
      flags.forEach(function(element) {
        $scope.checkedItems[element] = true;
      });

    } else if ($scope.reelyactive.show) {
      console.log(advlib.reelyactive.process($scope.payload))
      $scope.reelyactive.packet = advlib.reelyactive.process($scope.payload);
      $scope.packet = JSON.stringify($scope.reelyactive.packet, null, " ");
    }
  }

  $scope.headerType = [{
    name: 'ADV_IND'
  }, {
    name: 'ADV_DIRECT_IND'
  }, {
    name: 'ADV_NONCONNECT_IND'
  }, {
    name: 'SCAN_REQ'
  }, {
    name: 'SCAN_RSP'
  }, {
    name: 'CONNECT_REQ'
  }, {
    name: 'ADV_DISCOVER_IND'
  }, {
    name: 'UNRECOGNISED'
  }];



  window.MYSCOPE = $scope; // In order to access scope on console (to be removed when not testing)

})

.controller('AccordionDemoCtrl', function($scope) {
  $scope.oneAtATime = true;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});