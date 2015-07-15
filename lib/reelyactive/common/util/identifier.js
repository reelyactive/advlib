/**
 * Copyright reelyActive 2014
 * We believe in an open Internet of Things
 */


// Constants (Type)
var TYPE_EUI64 = 'EUI-64';
var TYPE_RA28 = 'RA-28';
var TYPE_ADVA48 = 'ADVA-48';
var TYPE_RADIO_PAYLOAD = 'RadioPayload';
var TYPE_UNDEFINED = 'Undefined';

// Constants
var REELYACTIVE_OUI36 = '001bc5094';


/**
 * Identifier Class
 * Represents an identifier
 * @param {string} type Type of identifier.
 * @param {Object} value The value of the given identifier.
 * @constructor
 */
function Identifier(type, value) {
  var isValue = (value != null);

  // Constructor for EUI-64
  if((type == TYPE_EUI64) && isValue) {
    this.type = TYPE_EUI64;
    this.value = value;
  }

  // Constructor for RA-28
  else if((type == TYPE_RA28) && isValue) {
    this.type = TYPE_RA28;
    this.value = value.substr(value.length - 7, 7);
  }

  // Constructor for ADVA-48
  else if((type == TYPE_ADVA48) && isValue) {
    this.type = TYPE_ADVA48;
    this.value = value;
  }

  // Constructor for RadioPayload
  else if((type = TYPE_RADIO_PAYLOAD) && isValue) {
    this.type = TYPE_RADIO_PAYLOAD;
    this.value = value.payload;
    this.lengthBytes = value.payloadLengthBytes;
  }

  // Constructor for Undefined
  else {
    this.type = TYPE_UNDEFINED;
    this.value = null;
  }
};


/**
 * Convert this identifier to a new one of the given type, if possible.
 * @param {string} newType New identifier type.
 */
Identifier.prototype.toType = function(newType) {
  var isEUI64Target = (newType === TYPE_EUI64);
  var isRA28Source = (this.type === TYPE_RA28);

  if(isEUI64Target && isRA28Source) {
    return new Identifier(TYPE_EUI64, REELYACTIVE_OUI36 + this.value);
  }

  return null;
}


module.exports = Identifier;
module.exports.EUI64 = TYPE_EUI64;
module.exports.RA28 = TYPE_RA28;
module.exports.ADVA48 = TYPE_ADVA48;
module.exports.RADIO_PAYLOAD = TYPE_RADIO_PAYLOAD;
module.exports.UNDEFINED = TYPE_UNDEFINED;