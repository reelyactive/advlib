advlib
======

Library for wireless advertising packet decoding.  Currently supports the following protocols:
* [Bluetooth Smart (BLE)](#bluetooth-smart-ble-advertising-packet-library)
* [reelyActive RFID](#reelyactive-rfid-library)


Installation
------------

    npm install advlib


Hello advlib
------------

```javascript
var advlib = require('advlib');

var rawHexPacket = '421655daba50e1fe0201050c097265656c794163746976650100';
var processedPacket = advlib.ble.process(rawHexPacket);

console.log(JSON.stringify(processedPacket, null, " "));
```

Bluetooth Smart (BLE) Advertising Packet Library
------------------------------------------------

Process a raw packet (as a hexadecimal string) with the following command:

    advlib.ble.process(rawHexPacket);

The library is organised hierarchically so that the separate elements of a packet can be processed individually.  Refer to the index below for details on each element:

* [Header](#header)
* [Address](#address)
* [Data](#data)
  * [Generic Access Profile (GAP)](#generic-access-profile-gap)

### Header

Description to come

### Address

Description to come

### Data

#### Generic Access Profile (GAP)

Description to come


reelyActive RFID Library
------------------------

Process a raw packet (as a hexadecimal string) with the following command:

    advlib.reelyactive.process(rawHexPacket);


What's next?
------------

This is an active work in progress.  Expect regular changes and updates, as well as improved documentation!


License
-------

MIT License

Copyright (c) 2015 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
