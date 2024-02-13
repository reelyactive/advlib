import * as advlib from 'advlib';
import * as advlibepc from 'advlib-epc';


export const BLE_PROCESSOR = {
    processor: require('advlib-ble'),
    libraries: [ require('advlib-ble-services'),
                 require('advlib-ble-manufacturers') ],
    options: { ignoreProtocolOverhead: false,
               indices: [ require('sniffypedia') ] }
};
export const ESP_PROCESSOR = {
    processor: require('advlib-esp'),
    libraries: [ require('advlib-eep-vld'),
                 require('advlib-eep-4bs'),
                 require('advlib-eep-rps'),
                 require('advlib-eep-msc') ],
    options: { ignoreProtocolOverhead: false }
};
export const INTERPRETERS = [ require('advlib-interoperable') ];


export function process(packets, processors, interpreters) {
  return advlib.process(packets, processors, interpreters);
}

export function processEPC(epc) {
  return advlibepc.processEPC(epc);
}
