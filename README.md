advlib
======

Library for wireless advertising packet decoding.  Currently supports the following protocols:
* [Bluetooth Smart (BLE)](#bluetooth-smart-ble-advertising-packet-library)
* [reelyActive RFID](#reelyactive-rfid-library)

For a live, interactive version of advlib visit [reelyactive.github.io/advlib](http://reelyactive.github.io/advlib/).

This project was published in a scientific paper entitled [Low-Power Wireless Advertising Software Library for Distributed M2M and Contextual IoT](http://reelyactive.com/science/reelyActive-IoT2015.pdf) presented at the [2nd IEEE World Forum on Internet of Things (WF-IoT)](http://wfiot2015.ieee-wf-iot.org/) in Milan, Italy on December 16th, 2015.

![advlib black box](https://reelyactive.github.io/advlib/web/images/advlib-blackbox.png)


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
* [Data (GAP)](#data-generic-access-profile)
  * [Flags](#flags)
  * [UUID](#uuid)
  * [Local Name](#local-name)
  * [Tx Power](#tx-power)
  * [Slave Connection Interval Range](#slave-connection-interval-range)
  * [Solicitation](#solicitation)
  * [Service Data](#service-data)
  * [Manufacturer Specific Data](#manufacturer-specific-data)
  * [Generic Data](#generic-data)
* [Data (GATT)](#data-generic-attribute-profile)
  * [Member Services](#member-services)
  * [Standard Services](#standard-services)

Complementary to the packet processing hierarchy above is a _common_ folder which contains supporting functions and lookups that are subject to frequent evolution:

* [Common](#common)
  * [Assigned Numbers](#assigned-numbers)
  * [Manufacturers](#manufacturers)
  * [Utilities](#util)


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
| 2 to length | Type-specifc data                                     |

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


#### UUID 

Process a UUID assigned to the device with any of the following commands:

    advlib.ble.data.gap.uuid.nonComplete16BitUUIDs(payload, cursor, advertiserData);
    advlib.ble.data.gap.uuid.complete16BitUUIDs(payload, cursor, advertiserData);
    advlib.ble.data.gap.uuid.nonComplete128BitUUIDs(payload, cursor, advertiserData);
    advlib.ble.data.gap.uuid.complete128BitUUIDs(payload, cursor, advertiserData);
    
    
This is best illustrated with an example:

    var payload = '16074449555520657669746341796c656572';
    advlib.ble.data.gap.uuid.complete128BitUUIDs(payload, 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String                       | Description                      |
|--------:|:---------------------------------|:----------------------------------------|
| 0       | 16                               | Length, in bytes, of type and data |
| 1       | 07                               | GAP Data Type for Complete 128-bit UUID | 
| 2 to 16 | 4449555520657669746341796c656572 | reelyActive's 128-bit UUID       |

Which would add the following property to advData:

    complete128BitUUIDs: "7265656c794163746976652055554944"


#### Local Name 

Process the device's local name, complete or shortened, with the following commands, respectively:

    advlib.ble.data.gap.localname.completeLocalName(payload, cursor, advertiserData);
    advlib.ble.data.gap.localname.shortenedLocalName(payload, cursor, advertiserData);
    
This is best illustrated with an example:

    advlib.ble.data.gap.localname.completeLocalName('12097265656c79416374697665', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String             | Description                             |
|--------:|:-----------------------|:----------------------------------------|
| 0       | 12                     | Length, in bytes, of type and data      |
| 1       | 09                     | GAP Data Type for Complete Local Name   | 
| 2 to 12 | 7265656c79416374697665 | ASCII representation of 'reelyActive'   |

Which would add the following property to advData:

    completeLocalName: "reelyActive"


#### Flags

Process the flags with the following command:

    advlib.ble.data.gap.flags.process(payload, cursor, advertiserData);
 
For reference, the flags are as follows:

| Bit | Description                                                    |
|----:|----------------------------------------------------------------|
| 0   | LE Limited Discoverable Mode                                   |
| 1   | LE General Discoverable Mode                                   |
| 2   | BR/EDR Not Supported                                           |
| 3   | Simultaneous LE and BR/EDR to Same Device Capable (Controller) |
| 4   | Simultaneous LE and BR/EDR to Same Device Capable (Host)       |
| 5   | Reserved                                                       |

This is best illustrated with an example:

    advlib.ble.data.gap.flags.process('020104', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte | Hex String  | Description                         |
|-----:|:------------|:------------------------------------|
| 0    | 02          | Length, in bytes, of type and data  |
| 1    | 01          | GAP Data Type for flags             | 
| 2    | 04          | See table above                     |

Which would add the following property to advData:

    flags: [ "BR/EDR Not Supported" ]


#### Manufacturer Specific Data

Process manufacturer specific data with the following command:

    advlib.ble.data.gap.manufacturerspecificdata.process(payload, cursor, advertiserData);
  
This is best illustrated with an example:

    advlib.ble.data.gap.manufacturerspecificdata.process('03ff8c00', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String | Description                                     |
|--------:|:-----------|:------------------------------------------------|
| 0       | 03         | Length, in bytes, of type and data              |
| 1       | ff         | GAP Data Type for manufacturer specific data    | 
| 2-3     | 8c00       | Gimbal company identifier code (bytes reversed) |

Which would add the following property to advData:

    manufacturerSpecificData: {
      companyIdentifierCode: "008c",
      data: ""
    }

The proprietary data of some manufacturers can be further processed.  The data for those supported will automatically be processed.  See the [Manufacturers](#manufacturers) section for the list of all supported manufacturers.

#### TX Power Level 

Process Tx Power Level with the following command:

    advlib.ble.data.gap.txpower.process(payload, cursor, advertiserData);
  
This is best illustrated with an example:

    advlib.ble.data.gap.txpower.process('020a7f', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String | Description                         |
|--------:|:-----------|:------------------------------------|
| 0       | 02         | Length, in bytes, of type and data  |
| 1       | 0a         | GAP Data Type for TxPower           | 
| 2       | 7f         | TxPower (see table below)           |

TxPower is a two's complement value which is interpreted as follows:

| Hex String  | Power dBm |
|------------:|-----------|
| 7f          | 127 dBm   |
| 00          | 0 dBm     |
| ff          | -128 dBm  |

Which would add the following property to advData:

    txPower: "127dBm"
    

#### Slave Connection Interval Range 

Process the Slave Connection Interval Range with the following command:

    advlib.ble.data.gap.slaveconnectionintervalrange.process(payload, cursor, advertiserData);
  
This is best illustrated with an example:

    advlib.ble.data.gap.slaveconnectionintervalrange.process('061200060c80', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String | Description                                       |
|--------:|:-----------|:--------------------------------------------------|
| 0       | 06         | Length, in bytes, of type and data                |
| 1       | 12         | GAP Data Type for Slave Connection Interval Range | 
| 2-6     | 00060c80   | Min and max intervals (see table below)           |

And the intervals are intepreted as follows:

| Byte(s) | Hex String | Description                               |
|--------:|:-----------|:------------------------------------------|
| 0-1     | 0006       | Min interval = 6 x 1.25 ms = 7.5 ms       |
| 2-3     | 0c80       | Max interval = 12128 x 1.25 ms = 15160 ms |

Which would add the following property to advData:

    slaveConnectionIntervalRange: "00060c80"
      

#### Service Solicitation 

Process a Service Solicitation UUID with any of the following commands:

    advlib.ble.data.gap.solicitation.solicitation16BitUUIDs(payload, cursor, advertiserData);
    advlib.ble.data.gap.solicitation.solicitation128BitUUIDs(payload, cursor, advertiserData);
    
This is best illustrated with an example:

    advlib.ble.data.gap.uuid.solicitation16BitUUIDs('0314d8fe', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String | Description                                          |
|--------:|:-----------|:-----------------------------------------------------|
| 0       | 03         | Length, in bytes, of type and data                   |
| 1       | 14         | GAP Data Type for 16-bit Service Solicitation UUID   | 
| 2-3     | d8fe       | Google's UriBeacon UUID (bytes reversed)             |

Which would add a property to advData as follows:

    solicitation16BitUUIDs: "fed8"


#### Service Data 

Process service data assigned to the device.

    advlib.ble.data.gap.servicedata.process(payload, cursor, advertiserData);
 
This is best illustrated with an example:

    advlib.ble.data.gap.servicedata.process('09160a181204eb150000', 0, {});
    
For reference, the example payload is interpreted as follows:

| Byte(s) | Hex String   | Description                         |
|--------:|:-------------|:------------------------------------|
| 0       | 09           | Length, in bytes, of type and data  |
| 1       | 16           | GAP Data Type for service data      | 
| 2-3     | 0a18         | UUID (bytes reversed)               |
| 4-9     | 1204eb150000 | Service Data                        |

Which would add the following properties to advData:

    serviceData: {
      uuid : "180a",
      data : "1204eb150000",
      specificationName: "Device Information"
    }

In this case, the service UUID represents one of the GATT [Standard Services](#standard-services) and is processed as such.

Additional examples for service UUIDs among the GATT [Member Services](#member-services) are given in that section below.


### Data (Generic Attribute Profile)

Process GATT service data (as a hexadecimal string) with the following command:

    advlib.ble.data.gatt.process(advData);

Where advData contains a serviceData object (see [Service Data](#service-data)), for instance:

    advData: {
      serviceData: {
        uuid: "fed8",
        data: "00f2027265656c7961637469766507"
      }
    }

Based on the UUID, the serviceData will be parsed as either a [member service](#member-services) or a [standard service](#standard-services), as applicable.  Note that not all services are yet implemented.


#### Member Services

Based on a pilot program for members which allows the SIG to allocate a 16-bit Universally Unique Identifier (UUID) for use with a custom GATT-based service defined by the member.

| UUID   | Member                | Description                           |
|-------:|-----------------------|---------------------------------------|
| 0xfed8 | Google                | UriBeacon (Physical Web)              |
| 0xfeaa | Google                | Eddystone                             |


##### Google

Supports Eddystone ([UID](#eddystone-uid), [URL](#eddystone-url), [TLM](#eddystone-tlm) & [EID](#eddystone-eid)) and the [UriBeacon](#uribeacon) of the Physical Web.

###### UriBeacon

Process UriBeacon data (UUID = 0xfed8).

    advlib.ble.data.gatt.services.members.process(advData);
 
This is best illustrated with an example using the following input:

    advData: {
      serviceData: {
        uuid: "fed8",
        data: "00f2027265656c7961637469766507"
      }
    }
       
For reference, the example serviceData.data is interpreted as follows, based on the [UriBeacon Advertising Packet Specification](https://github.com/google/uribeacon/blob/uribeacon-final/specification/AdvertisingMode.md):

| Byte(s) | Hex String               | Description                   |
|--------:|:-------------------------|:------------------------------|
| 0       | 00                       | UriBeacon flags               |
| 1       | f2                       | UriBeacon TxPower level       | 
| 3       | 02                       | Uri Scheme Prefix (http://)   |
| 4-15    | 7265656c7961637469766507 | Encoded Uri (reelyactive.com) |

Which would add the following properties to advData:

    serviceData: {
      uuid: "fed8",
      data: "00f2027265656c7961637469766507",
      companyName: "Google​",
      uriBeacon: {
        invisibleHint: false,
        txPower: "-14dBm",
        url: "http://reelyactive.com"
      }
    }

###### Eddystone-UID

Process Eddystone-UID data (UUID = 0xfeaa).

    advlib.ble.data.gatt.services.members.process(advData);
 
This is best illustrated with an example using the following input:

    advData: {
      serviceData: {
        uuid: "feaa",
        data: "00128b0ca750095477cb3e770011223344550000"
      }
    }
       
For reference, the example serviceData.data is interpreted as follows, based on the [Eddystone-UID specification](https://github.com/google/eddystone/tree/master/eddystone-uid):

| Byte(s) | Hex String           | Description                   |
|--------:|:---------------------|:------------------------------|
| 0       | 00                   | Eddystone-UID Frame Type      |
| 1       | 12                   | Calibrated TxPower at 0m      | 
| 2-11    | 8b0ca750095477cb3e77 | 10-byte ID Namespace          |
| 12-17   | 001122334455         | 6-byte ID Instance            |
| 18-19   | 0000                 | Reserved for Future Use       |

Which would add the following properties to advData:

    serviceData: {
      uuid: "feaa",
      data: "00128b0ca750095477cb3e770011223344550000",
      eddystone: {
        type: "UID",
        txPower: "18dBm",
        uid: {
          namespace: "8b0ca750095477cb3e77",
          instance: "001122334455"
        }
      }
    }

###### Eddystone-URL

Process Eddystone-URL data (UUID = 0xfeaa).

    advlib.ble.data.gatt.services.members.process(advData);
 
This is best illustrated with an example using the following input:

    advData: {
      serviceData: { 
        uuid: "feaa",
        data: "1012027265656c7961637469766507" 
      }
    }
       
For reference, the example serviceData.data is interpreted as follows, based on the [Eddystone-URL specification](https://github.com/google/eddystone/tree/master/eddystone-url):

| Byte(s) | Hex String               | Description                   |
|--------:|:-------------------------|:------------------------------|
| 0       | 10                       | Eddystone-URL Frame Type      |
| 1       | 12                       | Calibrated TxPower at 0m      | 
| 2       | 02                       | URL Scheme (http://)          |
| 3-14    | 7265656c7961637469766507 | Encoded URL (reelyactive.com) |

Which would add the following properties to advData:

    serviceData: {
      uuid: "feaa",
      data: "1012027265656c7961637469766507",
      eddystone: {
        type: "URL",
        txPower: "18dBm",
        url: "http://reelyactive.com"
      }
    }

###### Eddystone-TLM

Process Eddystone-TLM data (UUID = 0xfeaa).

    advlib.ble.data.gatt.services.members.process(advData);
 
This is best illustrated with an example using the following input:

    advData: {
      serviceData: { 
        uuid: "feaa",
        data: "20000bb81800000000010000000a"  
      }
    }
       
For reference, the example serviceData.data is interpreted as follows, based on the [Eddystone-TLM specification](https://github.com/google/eddystone/tree/master/eddystone-tlm), in this case [Unencrypted TLM](https://github.com/google/eddystone/blob/master/eddystone-tlm/tlm-plain.md):

| Byte(s) | Hex String               | Description                   |
|--------:|:-------------------------|:------------------------------|
| 0       | 20                       | Eddystone-TLM Frame Type      |
| 1       | __00__                   | TLM Version                   | 
| 2-3     | 0bb8                     | Battery Voltage (mV)          |
| 4-5     | 1800                     | Temperature (8:8 fixed point) |
| 6-9     | 00000001                 | Advertising PDU Count         |
| 10-13   | 0000000a                 | Uptime (0.1s resolution)      |

Which would add the following properties to advData:

    serviceData: {
      uuid: 'feaa',
      data: '20000bb81800000000010000000a',
      eddystone: {
        type: "TLM",
        version: "00",
        batteryVoltage: "3000mV",
        temperature: "24C",
        advertisingCount: 1,
        uptime: "1s"
      }
    }

Consider also the example of [Encrypted TLM](https://github.com/google/eddystone/blob/master/eddystone-tlm/tlm-encrypted.md):

| Byte(s) | Hex String               | Description              |
|--------:|:-------------------------|:-------------------------|
| 0       | 20                       | Eddystone-TLM Frame Type |
| 1       | __01__                   | TLM Version              | 
| 2-13    | 112233445566778899aabbcc | Encrypted TLM            |
| 14-15   | 0123                     | Salt                     |
| 16-17   | abcd                     | Message Integrity Check  |

Which would add the following properties to advData:

    serviceData: {
      uuid: 'feaa',
      data: '2001112233445566778899aabbcc0123abcd',
      eddystone: {
        type: "TLM",
        version: "01",
        etlm: "112233445566778899aabbcc",
        salt: "0123",
        mic: "abcd"
      }
    }

###### Eddystone-EID

Process Eddystone-EID data (UUID = 0xfeaa).

    advlib.ble.data.gatt.services.members.process(advData);
 
This is best illustrated with an example using the following input:

    advData: {
      serviceData: {
        uuid: "feaa",
        data: "30001122334455667788"
      }
    }
       
For reference, the example serviceData.data is interpreted as follows, based on the [Eddystone-EID specification](https://github.com/google/eddystone/tree/master/eddystone-eid):

| Byte(s) | Hex String       | Description                 |
|--------:|:-----------------|:----------------------------|
| 0       | 30               | Eddystone-EID Frame Type    |
| 1       | 00               | Calibrated TxPower at 0m    | 
| 2-9     | 1122334455667788 | 8-byte Ephemeral Identifier |

Which would add the following properties to advData:

    serviceData: {
      uuid: "feaa",
      data: "30001122334455667788",
      eddystone: {
        type: "EID",
        txPower: "0dBm",
        eid: "1122334455667788"
      }
    }

#### Standard Services

The following GATT Services, assigned in the [GATT Specification](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx) are identified but not parsed:

- Alert Notification Service
- Automation IO
- Battery Service
- Blood Pressure
- Body Composition 
- Bond Management
- Continous Glucose Monitoring
- Current Time Service
- Cycling Power
- Cycling Speed and Cadence
- Device Information
- Environmental Sensing
- Generic Access 
- Generic Attribute
- Glucose
- Health Thermometer
- Heart Rate
- Human Interface Device
- Immediate Alert
- Indoor Positioning
- Internet Protocol Support
- Link Loss
- Location and Navigation
- Next DST Change Service
- Phone Alert Status Service
- Pulse Oximeter
- Reference Time Update Service
- Running Speed and Cadence
- Scan Parameters
- TX Power
- User Data
- Weight Scale


### Common

Supporting functions and lookups that are subject to frequent evolution are:
* [Assigned Numbers](#assigned-numbers)
* [Manufacturers](#manufacturers)
* [Utilities](#utilities)

#### Assigned Numbers

The Bluetooth SIG maintains a [list of assigned numbers](https://www.bluetooth.org/en-us/specification/assigned-numbers).  The advlib currently implements [16-bit UUIDs for Members](#member-services) and [Company Identifiers](#company-identifiers).

##### Company Identifiers

The Bluetooth SIG maintains a [list of company identifiers](https://www.bluetooth.org/en-us/specification/assigned-numbers/company-identifiers).  Look up a company name from its 16-bit code.

    advlib.ble.common.companyidentifiercodes.companyNames[companyCode];

For example:

    advlib.ble.common.companyidentifiercodes.companyNames['000d'];

would yield:

    "Texas Instruments Inc."

##### Member Services

The Bluetooth SIG maintains a list of 16-bit UUIDs for Members, for members.  In other words, this list is accessible to members.  Look up a company name from its 16-bit service UUID.

    advlib.ble.common.memberservices.companyNames[uuid];

For example:

    advlib.ble.common.memberservices.companyNames['feed'];

would yield:

    "Tile, Inc."

#### Manufacturers

All functions and lookups which represent manufacturer-proprietary data contained in the [Manufacturer Specific Data](#manufacturer-specific-data) data type are included here.  Each manufacturer is contained in a separate subfolder.

##### Apple

Process Apple-proprietary data from a packet's contained advertiser data.

    advlib.ble.common.manufacturers.apple.process(advData);

The first byte of the proprietary data specifies the type:

| Type (Hex String) | Description                             |
|------------------:|:----------------------------------------|
| 01                | Observed on iOS, not explicitly handled |
| 02                | [iBeacon](#ibeacon)                     |
| 05                | [AirDrop](#airdrop)                     |
| 08                | Unknown, observed on Macs               |
| 09                | Unknown, observed on Macs & AppleTV     |
| 0a                | [AirPlay](#airplay)                     |
| 0c                | Unknown, observed on iOS                |
| 10                | Unknown, observed on iOS & AppleTV      |

###### iBeacon

A specific case of Apple-proprietary data is the iBeacon.  Look up a licensee name from its 128-bit iBeacon UUID.

    advlib.ble.common.manufacturers.apple.ibeacon.licenseeNames[uuid];

For example:

    advlib.ble.common.manufacturers.apple.ibeacon.licenseeNames['f7826da64fa24e988024bc5b71e0893e'];

would yield:

    "Kontakt.io"

Process an iBeacon packet from the contained advertiser data.

    advlib.ble.common.manufacturers.apple.ibeacon.process(advData);

This is best illustrated with an example using the following input:

    advData: {
      manufacturerSpecificData: {
        companyIdentifierCode: "004c",
        data: "0215b9407f30f5f8466eaff925556b57fe6d294c903974"
      }
    }

For reference, the iBeacon payload is interpreted as follows:

| Byte(s) | Hex String                       | Description                    |
|--------:|:---------------------------------|:-------------------------------|
| 0       | 26                               | Length, in bytes, of type and data |
| 1       | ff                               | GAP Data Type for manufacturer specific data | 
| 2-3     | 4c00                             | Apple company identifier code (bytes reversed) |
| 4-5     | 0215                             | Identifier code for iBeacon    |
| 6-21    | b9407f30f5f8466eaff925556b57fe6d | UUID (assigned by Apple)       |
| 21-22   | 294c                             | Major                          |
| 23-24   | 9039                             | Minor                          |
| 25      | 74                               | TxPower (see TxPower section)  |

Which would add the following property to advData:

    manufacturerSpecificData: {
      iBeacon: {
        uuid: "b9407f30f5f8466eaff925556b57fe6d",
        major: "294c",
        minor: "9039",
        txPower: "116dBm",
        licenseeName: "Estimote"
      }
    }

###### AirDrop

A specific case of Apple-proprietary data is AirDrop.  Process an AirDrop packet from the contained advertiser data.

    advlib.ble.common.manufacturers.apple.airdrop.process(advData);

This is best illustrated with an example using the following input:

    advData: {
      manufacturerSpecificData: {
        companyIdentifierCode: "004c",
        data: "05120000000000000000011bc238fa0000000000"
      }
    }

For reference, the AirDrop payload is interpreted as follows:

| Byte(s) | Hex String                           | Description               |
|--------:|:-------------------------------------|:--------------------------|
| 0       | 12                                   | Length, in bytes, of data |
| 1-17    | 0000000000000000011bc238fa0000000000 | Data                      |

Which would add the following property to advData:

    manufacturerSpecificData: {
      airdrop: { 
        length: 18,
        data: "0000000000000000011bc238fa0000000000"
      }
    }

###### AirPlay

A specific case of Apple-proprietary data is AirPlay.  Process an AirPlay packet from the contained advertiser data.

    advlib.ble.common.manufacturers.apple.airplay.process(advData);

This is best illustrated with an example using the following input:

    advData: {
      manufacturerSpecificData: {
        companyIdentifierCode: "004c",
        data: "0a0100"
      }
    }

For reference, the AirPlay payload is interpreted as follows:

| Byte(s) | Hex String | Description               |
|--------:|:-----------|:--------------------------|
| 0       | 01         | Length, in bytes, of data |
| 1       | 00         | Data                      |

Which would add the following property to advData:

    manufacturerSpecificData: {
      airplay: { 
        length: 1,
        data: "00"
      }
    }

##### StickNFind

Process StickNFind-proprietary data from a packet's contained advertiser data.

    advlib.ble.common.manufacturers.sticknfind.process(advData);

The first byte of the proprietary data specifies the type:

| Type (Hex String) | Description                   |
|------------------:|:------------------------------|
| 01                | StickNFind Single             |
| 42                | StickNSense Motion            |

##### Estimote

Process Estimote-proprietary data from a packet's contained advertiser data.

    advlib.ble.common.manufacturers.estimote.process(advData);

###### Nearables

A specific case of Estimote-proprietary data is the [Nearable](http://developer.estimote.com/nearables/).  In the absence of official documentation, advlib assumes that all Estimote-proprietary data represents a Nearable and is interpreted based on experimentally-observed behaviour.  Kindly advise or submit a pull request should official documentation be made available.

This is best illustrated with an example using the following input:

    advData: {
      manufacturerSpecificData: {
        companyIdentifierCode: "015d",
        data: "012b9e3834cfbfaa710401acc1b202ff3f000353"
    }

| Byte(s) | Hex String       | Description                                  |
|--------:|:-----------------|:---------------------------------------------|
| 0       | 01               | Unknown (Type?). Status byte 0.              |
| 1-8     | 2b9e3834cfbfaa71 | 64-bit Nearables ID                          |
| 9       | 04               | Unknown (Firmware?). Status byte 1.          |
| 10      | 01               | Unknown (Toggling status?). Status byte 2.   |
| 11      | ac               | Temperature (LSB) (upper bits in next byte)  |
| 12      | c1               | Bit 6 current state. Temp. Status byte 3.    |
| 13      | b2               | Unknown (Toggling status?). Status byte 4.   |
| 14      | 02               | Acceleration in X-axis (two's complement)    |
| 15      | ff               | Acceleration in Y-axis (two's complement)    |
| 16      | 3f               | Acceleration in Z-axis (two's complement)    |
| 17      | 00               | Duration of current state (var. resolution)  |
| 18      | 03               | Duration of previous state (var. resolution) |
| 19      | 53               | Unknown (TX power?). Status byte 5.          |

Which would add the following property to advData:

    manufacturerSpecificData: {
      nearable: {
        id: "2b9e3834cfbfaa71",
        temperature: 26.75,
        currentState: "still",
        accelerationX: 0.03125,
        accelerationY: -0.015625,
        accelerationZ: 0.984375,
        currentStateSeconds: 0,
        previousStateSeconds: 3,
        statusBytes: [ "01", "04", "01", "c1", "b2", "53" ]
      }
    }


#### Utilities

##### PDU

More info to come.


reelyActive RFID Library
------------------------

Process a raw packet (as a hexadecimal string) with the following command:

    advlib.reelyactive.process(rawHexPacket);


What's next?
------------

This is an active work in progress.  Expect regular changes and updates, as well as improved documentation!  If you'd like to contribute, kindly read our [Node.js style guide](https://github.com/reelyactive/node-style-guide) and [contact us](http://context.reelyactive.com/contact.html) or make a pull request.


License
-------

MIT License

Copyright (c) 2015-2016 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
