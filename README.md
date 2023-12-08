advlib
======

The __advlib__ open source, protocol-agnostic library for decoding ambient wireless packets _as a web application_, hosted via GitHub Pages: [reelyactive.github.io/advlib](https://reelyactive.github.io/advlib/).

See the [advlib master branch](https://github.com/reelyactive/advlib) for more detailed documentation about __advlib__ itself.


Building with Webpack
---------------------

First install/update the development dependencies by running `npm install` from the root of this repository.

Then, (re)build the __js/advlib.min.js__ file by running either `npm start` or `webpack`, again from the root of this repository.

For reference, the following Webpack features are used:
- [output.library](https://webpack.js.org/configuration/output/#outputlibrary)
- [loading polyfills](https://webpack.js.org/guides/shimming/#loading-polyfills), specifically [buffer](https://github.com/feross/buffer), to allow advlib (which uses Node.js Buffer) to run in the browser


Project History
---------------

In 2023, the v1.x __advlib__ web application was bundled using [Webpack](https://webpack.js.org/) and launched with support for Bluetooth Low Energy, RAIN RFID (EPC), and EnOcean Alliance packet decoding.

The original v0.1 __advlib__ web application, which was bundled using [Browserify](https://browserify.org/), and supports Bluetooth Low Energy and reelyActive Active RFID packet decoding, can be found in the [gh-pages-0.1](https://github.com/reelyactive/advlib/tree/gh-pages-0.1) branch of this repository.


License
-------

MIT License

Copyright (c) 2015-2023 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
