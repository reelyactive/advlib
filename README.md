advlib
======

__advlib__ is a library for decoding ambient wireless packets into web-standard JSON with a vendor/technology/application-agnostic set of properties.

![Overview of advlib](https://reelyactive.github.io/advlib/images/overview.png)

__advlib__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib) that can run on resource-constrained edge devices as well as on powerful cloud servers and anything in between.  It is included in reelyActive's [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware with its complementary _processor_ and _interpreter_ modules.  There's even an interactive, browser-based version hosted from the [gh-pages branch](https://github.com/reelyactive/advlib/tree/gh-pages) of this repository: [reelyactive.github.io/advlib/](https://reelyactive.github.io/advlib/)


Open Source _and_ Published
---------------------------

In addition to being permissively-licensed open source software, our paper [Low-Power Wireless Advertising Software Library for Distributed M2M and Contextual IoT](https://ieeexplore.ieee.org/document/7389121/) was published and presented at the 2015 2nd IEEE World Forum on Internet of Things (WF-IoT) in Milan, Italy.  Learn more at [reelyactive.com/science](https://www.reelyactive.com/science/).


Processor modules
-----------------

__advlib__ is protocol-agnostic and currently supports the following _processor_ modules:
- [advlib-ble](https://github.com/reelyactive/advlib-ble) for Bluetooth Low Energy
- [advlib-epc-tds](https://github.com/reelyactive/advlib-epc-tds) for RAIN RFID (Electronic Product Code Tag Data Standard)
- [advlib-esp](https://github.com/reelyactive/advlib-esp) for the EnOcean Wireless Standard (via the EnOcean Serial Protocol)


Interpreter modules
-------------------

__advlib__ currently supports the following _interpreter_ module:
- [advlib-interoperable](https://github.com/reelyactive/advlib-interoperable) for [InteroperaBLE identifiers](https://reelyactive.github.io/interoperable-identifier/).


Hello advlib!
-------------

For example, process several raw packets received from a beacon by selecting Bluetooth Low Energy as the processor ([advlib-ble](https://github.com/reelyactive/advlib-ble)) and including any relevant processor and interpreter libraries.

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

Paste the code above into a decoder.js file.  From the same folder, install package dependencies with the commands `npm install advlib`, `npm install advlib-ble`, ..., `npm install advlib-interoperable`.  Then run the code with the command `node decoder.js` and observe the packets combined, in order of precedence, into a single JSON:

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

| Property                     | Type             | Notes                 |
|:-----------------------------|:-----------------|-----------------------|
| acceleration                 | Array of Number  | [ x, y, z ] In g      |
| accelerationSamplingRate     | Number           | In Hz                 |
| accelerationTimeSeries       | Array of Array   | [[x],[y],[z] ] In g   |
| ammoniaConcentration         | Number           | In ppm                |
| amperage                     | Number           | In amps               |
| amperages                    | Array of Number  | In amps               |
| angleOfRotation              | Number           | In degrees            |
| angularVelocity              | Number           | In degrees per second |
| appearance                   | String           | From Bluetooth        |
| batteryPercentage            | Number           | 0 to 100 (%)          |
| batteryVoltage               | Number           | In volts              |
| carbonDioxideConcentration   | Number           | In ppm                |
| carbonMonoxideConcentration  | Number           | In ppm                |
| count                        | Number           |                       |
| counts                       | Array of Number  |                       |
| deviceIds                    | Array of String  |                       |
| deviceType                   | String           |                       |
| dissolvedOxygen              | Number           | 0 to 100+ (%)         |
| distance                     | Number           | In m                  |
| duration                     | Number           | In milliseconds       |
| durations                    | Array of Number  | In milliseconds       |
| elevation                    | Number           | In m                  |
| encrypted                    | Object           | See note below        |
| energy                       | Number           | In kWh                |
| firmwareVersion              | String           |                       |
| hardwareVersion              | String           |                       |
| heading                      | Number           | In degrees            |
| heartRate                    | Number           | In beats per minute   |
| illuminance                  | Number           | In lx                 |
| interactionDigest            | Array of Object  |                       |
| isButtonPressed              | Array of Boolean |                       |
| isButtonPressedCycle         | Number           |                       |
| isCarbonMonoxideDetected     | Boolean          |                       |
| isCarbonMonoxideDetectedCycle | Array ofBoolean |                       |
| isContactDetected            | Array of Boolean |                       |
| isContactDetectedCycle       | Number           |                       |
| isGasDetected                | Array of Boolean |                       |
| isGasDetectedCycle           | Number           |                       |
| isHealthy                    | Boolean          |                       |
| isInputDetected              | Array of Boolean |                       |
| isInputDetectedCycle         | Number           |                       |
| isLightDetected              | Array of Boolean |                       |
| isLightDetectedCycle         | Number           |                       |
| isLiquidDetected             | Array of Boolean |                       |
| isLiquidDetectedCycle        | Number           |                       |
| isMotionDetected             | Array of Boolean |                       |
| isMotionDetectedCycle        | Number           |                       |
| isOccupancyDetected          | Array of Boolean |                       |
| isOccupancyDetectedCycle     | Number           |                       |
| isSmokeDetected              | Array of Boolean |                       |
| isSmokeDetectedCycle         | Number           |                       |
| isTamperDetected             | Array of Boolean |                       |
| isTamperDetectedCycle        | Number           |                       |
| languages                    | Array of String  | ISO 639-1             |
| levelPercentage              | Number           | 0 to 100 (%)          |
| luminousFlux                 | Number           | In lumens             |
| magneticField                | Array of Number  | [ x, y, z ] In G      |
| methaneConcentration         | Number           | In ppm                |
| name                         | String           |                       |
| nearest                      | Array of Object  |                       |
| nitrogenDioxideConcentration | Number           | In ppm                |
| nitrogenOxidesIndex          | Number           | Index (1 to 500)      |
| numberOfOccupants            | Number           |                       |
| numberOfOccupantsCycle       | Number           |                       |
| numberOfReceivedDevices      | Number           |                       |
| numberOfStrongestReceivedDevices | Number       |                       |
| passageCounts                | Array of Number  | [ entries, exits ]    |
| passageCountsCycle           | Number           |                       |
| pH                           | Number           | 0 to 14 (typical)     |
| pm1.0                        | Number           | In ug/m3              |
| pm2.5                        | Number           | In ug/m3              |
| pm10                         | Number           | In ug/m3              |
| position                     | Array of Number  | [ lon, lat, ele ]     |
| power                        | Number           | In W                  |
| pressure                     | Number           | In Pa                 |
| pressures                    | Array of Number  | In Pa                 |
| raw                          | String           | Hexadecimal           |
| relativeHumidity             | Number           | 0 to 100 (%)          |
| relay                        | Object           | See note below        |
| soundPressure                | Number           | In dB                 |
| speed                        | Number           | In m/s                |
| temperature                  | Number           | In Celcius            |
| temperatures                 | Array of Number  | In Celcius            |
| text                         | String           | In UTF-8              |
| txCount                      | Number           |                       |
| txCycle                      | Number           |                       |
| txPower                      | Number           | In dBm                |
| uptime                       | Number           | In milliseconds       |
| uri                          | String           |                       |
| uuids                        | Array of String  |                       |
| velocityOverall              | Array of Number  | [ x, y, z ] In m/s    |
| version                      | String           | Format pending        |
| volatileOrganicCompoundsConcentration | Number  | In ppm                |
| voltage                      | Number           | In volts              |
| voltages                     | Array of Number  | In volts              |

Properties are intended to be as flat as possible to facilitate data manipulation, especially with respect to database schemas.  One exception is the _relay_ property which encapsulates ambient data intended for external processing by a third party.  A _relay_ Object has only one mandatory property, _type_, which is a String identifying the third party, and may also include any number of third-party-specific properties.  Another exception is the _encrypted_ property which encapsulates data intended for decryption and/or authentication.  An _encrypted_ Object may include any of the following properties: _data_, _salt_, _checksum_, _method_.

Some properties have a singular and plural form where the latter is to represent multiple properties of the same type from a single device (ex: sensor beacon with multiple temperature probes).  In this case, the length of the Array is expected to correspond to the number of such instances supported by the device, with Array elements represented as `null` in the absence of a value.

Some properties represent values captured over time, and are referenced against a cyclic counter to indicate a new capture or sample.  In this case, the cyclic count is represented as a separate property which adds a _Cycle_ suffix, for example, _passageCounts_ and _passageCountsCycle_.  In the case of variables with an _is_ prefix and a _Cycle_ suffix, the value is interpreted as a Number (rather than a Boolean).

Some properties may be extended to represent time series data, sampled at a given rate.  In this case the data is represented as separate properties adding a _TimeSeries_ suffix and a _SamplingRate_ suffix, for example _accelerationTimeSeries_ and _accelerationSamplingRate_.

See the [reelyActive Developer's Cheatsheet](https://reelyactive.github.io/diy/cheatsheet/) for more details about the standard properties above which are considered to be dynamic ambient (dynamb) data.


![advlib logo](https://reelyactive.github.io/advlib/images/advlib-bubble.png)


What's in a name?
-----------------

The name __advlib__, which is derived from "advertising library", sounds like _ad-lib_, hinting at the fact that decoding [ambient data](https://www.reelyactive.com/ambient-data/) is often improvised, especially when little or no documentation is available!

The function of __advlib__ is not unlike the Babel fish in Hitchiker's Guide to the Galaxy: _"if you stick a Babel fish in your ear you can instantly understand anything said to you in any form of language."_  Hence, the Babel fish would make an obvious choice of mascot.

Why then did we choose the cuneiform symbol 𒄩 (KU<sub>6</sub>) as the __advlib__ mascot?  _Something's fishy..._

Let's _ad-lib_ shall we?  The Babel fish is likely a reference to the [Tower of Babel](https://en.wikipedia.org//wiki/Tower_of_Babel) which itself is a parable meant to explain why the world's peoples speak different languages.  The tower may well have existed in ancient Babylon where the Sumerian/Akkadian languages were spoken.  [Cuneiform](https://en.wikipedia.org/wiki/Cuneiform), the earliest known writing system, was originally developed to write the Sumerian language.  And 𒄩 is the [Sumerian cuneiform symbol for fish](https://en.wiktionary.org/wiki/%F0%92%84%A9#Sumerian).  So 𒄩 can arguably be _decoded_ as Babel fish: the obvious choice of mascot indeed!

Does that seem like a completely implausable decoding of a cryptic message?  Well that's exactly what __advlib__ development often seemed like over the years!


Project History
---------------

The __advlib__ project began in 2015 and was published in a scientific paper entitled [Low-Power Wireless Advertising Software Library for Distributed M2M and Contextual IoT](https://www.reelyactive.com/science/reelyActive-IoT2015.pdf) presented at the [2nd IEEE World Forum on Internet of Things (WF-IoT)](http://wfiot2015.ieee-wf-iot.org/) in Milan, Italy that same year.

In 2020, __advlib__ was redesigned and updated to v1.x which is modular, more efficient, protocol-agnostic and better supports the broad range of use cases that have emerged since its initial conception.  The previous version remains available in the [release-0.1 branch](https://github.com/reelyactive/advlib/tree/release-0.1) and as [advlib@0.1.4 on npm](https://www.npmjs.com/package/advlib/v/0.1.4).


Modular Architecture
--------------------

__advlib__ is easily combined with the following complementary software modules:
- [barnowl](https://github.com/reelyactive/barnowl)
- [barnacles](https://github.com/reelyactive/barnacles)

Learn more about the [reelyActive Open Source Software packages](https://reelyactive.github.io/diy/oss-packages/), all of which are bundled together as [Pareto Anywhere](https://github.com/reelyactive/pareto-anywhere) open source IoT middleware.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2015-2026 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
