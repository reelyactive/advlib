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

var rawHexPacket = '421655daba50e1fe0201050c097265656c79416374697665';
var processedPacket = advlib.ble.process(rawHexPacket);

console.log(JSON.stringify(processedPacket, null, " "));
```

The console output should appear as follows:

    {
      type: "ADVA-48",
      value: "fee150bada55",
      advHeader: { 
        type: "ADV_NONCONNECT_IND",
        length: 22,
        txAdd: "random",
        rxAdd: "public" 
      },
      advData: {
        flags: [ "LE Limited Discoverable Mode", "BR/EDR Not Supported" ],
        completeLocalName: "reelyActive" 
      } 
    }


Bluetooth Smart (BLE) Advertising Packet Library
------------------------------------------------

Process a raw packet (as a hexadecimal string) with the following command:

    advlib.ble.process(rawHexPacket);

The library is organised hierarchically so that the separate elements of a packet can be processed individually.  Refer to the index below for details on each element:

* [Header](#header)
* [Address](#address)
* [Data](#data-generic-access-profile)
  * [Flags](#flags)
  * [UUID](#uuid)
  * [Local Name](#local-name)
  * [Tx Power](#tx-power)
  * [Slave Connection Interval Range](#slave-connection-interval-range)
  * [Solicitation](#solicitation)
  * [Service Data](#service-data)
  * [Manufacturer Specific Data](#manufacturer-specific-data)
  * [Generic Data](#generic-data)


### Header

Process a 16-bit header (as a hexadecimal string) with the following command:

    advlib.ble.header.process(rawHexHeader);

For reference, the 16-bit header is as follows (reading the hexadecimal string from left to right):

| Bit(s) | Function                      |
|-------:|-------------------------------|
| 15     | RxAdd: 0 = public, 1 = random |
| 14     | TxAdd: 0 = public, 1 = random |
| 13-12  | Reserved for Future Use (RFU) |
| 11-8   | Type (see table below)        |
| 7-6    | Reserved for Future Use (RFU) |
| 5-0    | Payload length in bytes       |

And the advertising packet types are as follows:

| Type | Packet           | Purpose                                |
|-----:|------------------|----------------------------------------|
| 0    | ADV_IND          | Connectable undirected advertising     |
| 1    | ADV_DIRECT_IND   | Connectable directed advertising       |
| 2    | ADV_NONCONN_IND  | Non-connectable undirected advertising |
| 3    | SCAN_REQ         | Scan for more info from advertiser     |
| 4    | SCAN_RSP         | Response to scan request from scanner  |
| 5    | CONNECT_REQ      | Request to connect                     |
| 6    | ADV_DISCOVER_IND | Scannable undirected advertising       |

For example:

    advlib.ble.header.process('4216');

would yield:

    {
      rxAdd: "public",
      txAdd: "random",
      type: "ADV_NONCONNECT_IND",
      length: 22
    }


### Address

Process a 48-bit address (as a hexadecimal string) with the following command:

    advlib.ble.address.process(rawHexAddress);

For reference, the 48-bit header is as follows (reading the hexadecimal string from left to right):

| Bit(s) | Address component |
|-------:|-------------------|
| 47-40  | xx:xx:xx:xx:xx:## |
| 39-32  | xx:xx:xx:xx:##:xx |
| 31-24  | xx:xx:xx:##:xx:xx |
| 23-16  | xx:xx:##:xx:xx:xx |
| 15-8   | xx:##:xx:xx:xx:xx |
| 7-0    | ##:xx:xx:xx:xx:xx |

This is best illustrated with an example:

    advlib.ble.address.process('0123456789ab');

Would yield:

    {
      type: "ADVA-48",
      value: "ab8967452301"
    }

which can alternatively be represented as ab:89:67:45:23:01.


### Data (Generic Access Profile)

Process GAP data (as a hexadecimal string) with the following command:

    advlib.ble.data.process(rawHexData);

For reference, the structure of the data is as follows:

| Byte(s)     | Data component                                        |
|------------:|-------------------------------------------------------|
| 0           | Length of the data in bytes (including type and data) |
| 1           | GAP Data Type (see table below)                       |
| 2 to length | Data                                                  |

The Generic Access Profile Data Types are listed on the [Bluetooth GAP Assigned Numbers website](https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile).  The following table lists the Data Types, their names and the section in this document in which they are described.

| Data Type | Data Type Name                       | See advlib section |
|----------:|--------------------------------------|--------------------|
| 0x01      | Flags                                | Flags              |
| 0x02      | Incomplete List of 16-bit UUIDs      | UUID               |
| 0x03      | Complete List of 16-bit UUIDs        | UUID               |
| 0x04      | Incomplete List of 32-bit UUIDs      | UUID               |
| 0x05      | Complete List of 32-bit UUIDs        | UUID               |
| 0x06      | Incomplete List of 128-bit UUIDs     | UUID               |
| 0x07      | Complete List of 128-bit UUIDs       | UUID               |
| 0x08      | Shortened Local Name                 | Local Name         |
| 0x09      | Complete Local Name                  | Local Name         |
| 0x0a      | Tx Power Level                       | Tx Power           |
| 0x0d      | Class of Device                      | Generic Data       |
| 0x0e      | Simple Pairing Hash C-192            | Generic Data       |
| 0x0f      | Simple Pairing Randomizer R-192      | Generic Data       |
| 0x10      | Security Manager TK Value            | Generic Data       |
| 0x11      | Security Manager OOB Flags           | Generic Data       |
| 0x12      | Slave Connection Interval Range      | SCIR               |
| 0x14      | 16-bit Solicitation UUIDs            | Solicitation       |
| 0x15      | 128-bit Solicitation UUIDs           | Solicitation       |
| 0x16      | Service Data 16-bit UUID             | Service Data       |
| 0x17      | Public Target Address                | Generic Data       |
| 0x18      | Random Target Address                | Generic Data       |
| 0x19      | Public Target Address                | Generic Data       |
| 0x1a      | Advertising Interval                 | Generic Data       |
| 0x1b      | LE Bluetooth Device Address          | Generic Data       |
| 0x1c      | LE Bluetooth Role                    | Generic Data       |
| 0x1d      | Simple Pairing Hash C-256            | Generic Data       |
| 0x1e      | Simple Pairing Hash Randomizer C-256 | Generic Data       |
| 0x1f      | 32-bit Solicitation UUIDs            | Solicitation       |
| 0x20      | Service Data 32-bit UUID             | Service Data       |
| 0x21      | Service Data 128-bit UUID            | Service Data       |
| 0x3d      | 3-D Information Data                 | Generic Data       |
| 0xff      | Manufacturer Specific Data           | Mfr. Specific Data |


#### Flags

Description to come


#### UUID

Description to come


#### Local Name

Description to come


#### Tx Power

Description to come


#### Slave Connection Interval Range

Description to come


#### Solicitation

Description to come


#### Service Data

Description to come


#### Manufacturer Specific Data

Description to come


#### Generic Data

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
