advlib
======

Library for wireless advertising packet decoding.  __advlib__ is protocol-agnostic and currently supports the following _processor_ modules:
- [advlib-ble](https://github.com/reelyactive/advlib-ble) for Bluetooth Low Energy

and the following _interpreter_ modules:
- [advlib-interoperable](https://github.com/reelyactive/advlib-interoperable) for [InteroperaBLE identifiers](https://reelyactive.github.io/diy/best-practices-ble-identifiers/#part04).

The _purpose_ of __advlib__ is to extract all potentially relevant information from ambient data packets and to organise this information in a consistent manner, regardless of the radio protocol.

The _objective_ of __advlib__ v1.x is to support and to make accessible the broadest array of use cases by being highly modular and by facilitating contributions to its continuous development.

__advlib__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib) that can run on resource-constrained edge devices as well as on powerful cloud servers and anything in between. It is a key element in [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source software of the [reelyActive technology platform](https://www.reelyactive.com/technology/).


Installation
------------

    npm install advlib


Hello advlib
------------

For example, process several raw packets received from a beacon by selecting Bluetooth Low Energy as the processor ([advlib-ble](https://github.com/reelyactive/advlib-ble)) and including any relevant processor and interpreter libraries (don't forget to first install these using npm).

```javascript
const advlib = require('advlib');

const PROCESSORS = [
    { processor: require('advlib-ble'),
      libraries: [ require('advlib-ble-services'),
                   require('advlib-ble-manufacturers') ],
      options: { ignoreProtocolOverhead: true } }
];
const INTERPRETERS = [ require('advlib-interoperable') ];

let packets = [
    'c21d04acbe55daba16096164766c6962206279207265656c79416374697665',
    'c21904acbe55daba1216aafe10fc017265656c7961637469766507',
    'c21804acbe55daba1116aafe20000c4815200000004500000258'
];
let processedPackets = advlib.process(packets, PROCESSORS, INTERPRETERS);
console.log(processedPackets);
```

Packets will be combined, in order of precedence, into a single JSON:

```javascript
{ name: "advlib by reelyActive",
  txPower: -4,
  uri: "https://www.reelyactive.com",
  batteryVoltage: 3.144,
  temperature: 21.125,
  txCount: 69,
  uptime: 60000 }
```


Standard Properties
-------------------

__advlib__ observes the following standard properties to represent the information extracted from ambient data packets.  New standard properties are added whenever new data cannot be effectively represented using the existing properties.  Once established, a standard property should not change (unless otherwise noted).

| Property          | Type             | Notes               |
|:------------------|:-----------------|---------------------|
| acceleration      | Array of Number  | [ x, y, z ] In g    |
| angleOfRotation   | Number           | In degrees          |
| appearance        | String           | From Bluetooth      |
| batteryPercentage | Number           | 0 to 100 (%)        |
| batteryVoltage    | Number           | In volts            |
| deviceIds         | Array of String  |                     |
| elevation         | Number           | In m                |
| heading           | Number           | In degrees          |
| heartRate         | Number           | In beats per minute |
| illuminance       | Number           | In lx               |
| interactionDigest | Array of Object  |                     |
| isButtonPressed   | Array of Boolean |                     |
| magneticField     | Array of Number  | [ x, y, z ] In G    |
| name              | String           |                     |
| nearest           | Array of Object  |                     |
| position          | Array of Number  | [ lon, lat, ele ]   |
| pressure          | Number           | In Pa               |
| relativeHumidity  | Number           | 0 to 100 (%)        |
| speed             | Number           | In m/s              |
| temperature       | Number           | In Celcius          |
| txCount           | Number           |                     |
| txPower           | Number           | In dBm              |
| uptime            | Number           | In milliseconds     |
| uri               | String           |                     |
| uuids             | Array of String  |                     |
| version           | String           | Format pending      |

Properties are intended to be as flat as possible to facilitate data manipulation, especially with respect to database schemas.


Project History
---------------

The __advlib__ project began in 2015 and was published in a scientific paper entitled [Low-Power Wireless Advertising Software Library for Distributed M2M and Contextual IoT](https://www.reelyactive.com/science/reelyActive-IoT2015.pdf) presented at the [2nd IEEE World Forum on Internet of Things (WF-IoT)](http://wfiot2015.ieee-wf-iot.org/) in Milan, Italy that same year.

In 2020, __advlib__ was redesigned and updated to v1.x which is modular, more efficient, protocol-agnostic and better supports the broad range of use cases that have emerged since its initial conception.  The previous version remains available in the [release-0.1 branch](https://github.com/reelyactive/advlib/tree/release-0.1) and as [advlib@0.1.4 on npm](https://www.npmjs.com/package/advlib/v/0.1.4).


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

[![Known Vulnerabilities](https://snyk.io/test/github/reelyactive/advlib/badge.svg)](https://snyk.io/test/github/reelyactive/advlib)


License
-------

MIT License

Copyright (c) 2015-2022 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
