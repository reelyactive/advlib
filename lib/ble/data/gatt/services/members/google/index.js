 /**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

 /**
 * Parse BLE advertiser data for Google data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function process(advertiserData) {

	switch(advertiserData.serviceData.uuid) {
      case("feaa"):
        eddystone(advertiserData);
      // case("fed8"):
      //   uribeacon.process(advertiserData);
      //   break;
        default:
 }
}

 /**
 * Parse BLE advertiser data for Eddystone data.
 * @param {Object} advertiserData The object containing all parsed data.
 */
function eddystone(advertiserData) {

  var dataType = advertiserData.serviceData.data.substr(2,2);
  var uuid = advertiserData.serviceData.data.substr(4,2);
  var frameType = advertiserData.serviceData.data.substr(8,2);

  advertiserData.serviceData.eddystone = {
                          dataType: dataType,
                          uuid: uuid, 
                          frameType: frameType };

    if(frameType === "00") {
      advertiserData.serviceData.eddystone.uid = {};
      advertiserData.serviceData.eddystone.uid.rangingData = advertiserData.serviceData.data.substr(10,2); 
      advertiserData.serviceData.eddystone.uid.namespace = advertiserData.serviceData.data.substr(12,20); 
      advertiserData.serviceData.eddystone.uid.instance = advertiserData.serviceData.data.substr(32,12); 
	}

	if(frameType === "10") {
	  advertiserData.serviceData.eddystone.uri = {};
	  advertiserData.serviceData.eddystone.uri.txPower = advertiserData.serviceData.data.substr(10,2); 
	  advertiserData.serviceData.eddystone.uri.urlScheme = advertiserData.serviceData.data.substr(12,2);
	  advertiserData.serviceData.eddystone.uri.encodedUrl = advertiserData.serviceData.data.substr(14,2);
	}

	if(frameType === "20") {  
	  advertiserData.serviceData.eddystone.tlm = {};
	  advertiserData.serviceData.eddystone.tlm.tlmVersion = advertiserData.serviceData.data.substr(10,2);
	  advertiserData.serviceData.eddystone.tlm.vBatt = advertiserData.serviceData.data.substr(12,4);
	  advertiserData.serviceData.eddystone.tlm.temp = advertiserData.serviceData.data.substr(16,4);
	  advertiserData.serviceData.eddystone.tlm.advCnt = advertiserData.serviceData.data.substr(20,8);
	  advertiserData.serviceData.eddystone.tlm.secCnt = advertiserData.serviceData.data.substr(28,8);
	} 
  }

module.exports.process = process;
