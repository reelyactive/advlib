advlib
======

Web front-end for advlib via GitHub Pages.  Currently supports the following protocols:
* [Bluetooth Smart (BLE)](#bluetooth-smart-ble-advertising-packet-library)
* [reelyActive RFID](#reelyactive-rfid-library)

See the [advlib master branch](https://github.com/reelyactive/advlib) for more detailed documentation, or [advlib on npmjs](https://www.npmjs.com/package/advlib).


How we create this using browserify
-----------------------------------

#### Installing Browserify

[Browserify](http://browserify.org/) is a beautiful tool which bundles up and concatenates NodeJS modules for use in browser environments.  

To get started with browserify, install browserify globally with npm:

    npm install -g browserify

or

    sudo npm install -g browserify

#### Integrating Back-End Logic to Front-End Code

Feel free to require NodeJS modules you need to run your app, or any npm modules you need in order to write your AngularJS code for the browser in web/js/advapp.js. 

    var advlib = require('advlib');
    var angular = require('angular');

If at this point you are confused that you are using NodeJS's module loading system for your browser's JavaScript code, do not worry as Browserify bundles it all up into a single neat and tidy JavaScript file which can be understood by the browser.

#### Using Browserify

Now to recursively bundle up all the required modules starting at web/js/advapp.js into a single file called advlib.js, use the following browserify command:

    browserify web/js/advapp.js -o web/js/advlib.js 

Finally, drop a single script tag into your index.html file and you are done!

``` html
<script src="js/advlib.js"></script>
```

If at any point you need to update the web/js/advapp.js file, you will notice the pain in having to run browserify after every update. To save yourself from this trouble, we use (watchify)[https://www.npmjs.com/package/watchify].

Type in the following watchify command once:

    $ watchify web/js/advapp.js -o web/js/advlib.js


Now as you update the web/js/advapp.js file, web/advlib.js will be automatically incrementally rebuilt on the fly.


Bluetooth Smart (BLE) Advertising Packet Librarya
------------------------------------------------

More info to come


reelyActive RFID Library
------------------------

More info to come


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