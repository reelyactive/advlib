advlib
======

Library for wireless advertising packet decoding.  __advlib__ is protocol-agnostic and currently supports the following processor modules:
- [advlib-ble](https://github.com/reelyactive/advlib-ble) for Bluetooth Low Energy

The _purpose_ of __advlib__ is to extract all potentially relevant information from ambient data packets and to organise this information in a consistent manner, regardless of the radio protocol.

The _objective_ of __advlib__ v1.x is to support and to make accessible the broadest array of use cases by being highly modular and by facilitating contributions to its continuous development.

__advlib__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib) that can run on resource-constrained edge devices as well as on powerful cloud servers and anything in between. It is a key element in [Pareto Anywhere](https://getpareto.com/) open source software of the [reelyActive technology platform](https://www.reelyactive.com/technology/).


Installation
------------

    npm install advlib


Hello advlib
------------

For example, process several raw packets received from a beacon by selecting Bluetooth Low Energy as the processor ([advlib-ble](https://github.com/reelyactive/advlib-ble)) and including any relevant processing libraries (don't forget to first install these using npm).

```javascript
const advlib = require('advlib');

const PROCESSORS = [
    { processor: require('advlib-ble'),
      libraries: [ require('advlib-ble-services'),
                   require('advlib-ble-manufacturers') ] }
];

let packets = [
    'c21d04acbe55daba16096164766c6962206279207265656c79416374697665',
    'c21904acbe55daba1216aafe10fc017265656c7961637469766507',
    'c21804acbe55daba1116aafe20000c4815200000004500000258'
];
let processedPackets = advlib.process(packets, PROCESSORS);
console.log(processedPackets);
```

Packets will be combined, in order of precedence, into a single JSON:

```javascript
{ rxAdd: "random",
  txAdd: "random",
  type: "ADV_NONCONN_IND",
  length: 29,
  advA: "bada55beac04",
  name: "advlib by reelyActive",
  txPower: -4,
  uri: "https://www.reelyactive.com",
  batteryVoltage: 3.144,
  temperature: 21.125,
  txCount: 69,
  uptime: 60000 }
```


What's next?
------------

__advlib__ v1.0.0 was released in September 2020, superseding all earlier versions, the latest of which remains available in the [release-0.1 branch](https://github.com/reelyactive/advlib/tree/release-0.1) and as [advlib@0.1.4 on npm](https://www.npmjs.com/package/advlib/v/0.1.4).

If you're developing with advlib check out:
* [diyActive](https://reelyactive.github.io/) our developer page
* our [node-style-guide](https://github.com/reelyactive/node-style-guide) for development
* our [contact information](https://www.reelyactive.com/contact/) to get in touch if you'd like to contribute


License
-------

MIT License

Copyright (c) 2015-2020 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
