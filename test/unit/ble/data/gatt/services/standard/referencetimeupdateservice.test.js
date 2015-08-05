/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var referencetimeupdateservice = require("../../../../../../../lib/ble/"+
                  "data/gatt/services/standard/referencetimeupdateservice.js");
var assert = require('assert'); 


// Inputs for the scenario
var INPUT_DATA = {
  serviceData: { 
    uuid: "1806",
    data: "1204eb150000" 
  }
};

// Expected outputs for the scenario
var EXPECTED_DATA = {
  serviceData: {
    uuid: "1806",
    data: "1204eb150000",
    specificationName: "Reference Time Update Service"
  }
};

describe('ble data gatt standard referencetimeupdateservice', function() {

  // Test the process function
  it('should parse BLE advertiser data referencetimeupdateservice', function() {
    var advertiserData = INPUT_DATA;
    referencetimeupdateservice.process(advertiserData);
    assert.deepEqual(advertiserData, EXPECTED_DATA);
  });
});