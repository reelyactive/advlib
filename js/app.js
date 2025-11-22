/**
 * Copyright reelyActive 2023-2025
 * We believe in an open Internet of Things
 */


// Constant definitions
const ESP_SYNC_BYTE = '55';


// DOM elements
let blepackets = document.querySelector('#blepackets');
let epc = document.querySelector('#epc');
let esptelegram = document.querySelector('#esptelegram');
let eeptype = document.querySelector('#eeptype');
let processedJson = document.querySelector('#processedJson');


// Handle BLE Process button click
bleprocess.addEventListener('click', () => {
    let packets = blepackets.value.replace('\r', '').split('\n');
    let json = advlib.process(packets, [ advlib.BLE_PROCESSOR ],
                              advlib.INTERPRETERS);
    processedJson.textContent = JSON.stringify(json, null, 2);
});

// Handle EPC Process button click
epcprocess.addEventListener('click', () => {
    let json = advlib.processEPC(epc.value);
    processedJson.textContent = JSON.stringify(json, null, 2);
});

// Handle ESP Process button click
espprocess.addEventListener('click', () => {
    let packets = [ esptelegram.value ];
    let isERP1PayloadOnly = !esptelegram.value.startsWith(ESP_SYNC_BYTE);
    let processor = Object.assign({}, advlib.ESP_PROCESSOR);
    processor.options.isERP1PayloadOnly = isERP1PayloadOnly;

    let json = advlib.process(packets, [ processor ]);

    if(Array.isArray(json?.deviceIds) && (json.deviceIds.length === 1)) {
      let deviceProfiles = {};
      deviceProfiles[json.deviceIds[0]] = { eepType: eeptype.value };
      processor.options.deviceProfiles = deviceProfiles;
      json = advlib.process(packets, [ processor ]);
    }

    processedJson.textContent = JSON.stringify(json, null, 2);
});
