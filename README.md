## ejs-brunch [![Build Status](https://travis-ci.org/munshkr/ejs-brunch.svg?branch=master)](https://travis-ci.org/munshkr/ejs-brunch)

Adds [Embedded Javascript template (EJS)](https://github.com/mde/ejs)
compilation support to [brunch](http://brunch.io).

For each file ending with the `.ejs` extension, generate a compile function
inside a module.

## Example

```html
<!-- in 'app/foo.html.ejs' -->
<li id="<%= id %>"><%= name.toUpperCase() %></li>
```

```javascript
// in 'app/initialize.js'
let fooTpl = require('foo.html');
console.log(fooTpl({ id: 1, name: "nice!" }));
// => '<li id="1">NICE!</li>'
```

Notice that ejs-brunch *does not compile assets*. Instead it generates compile
functions as dynamic templates to be used by client-side code.

## Usage

Install the plugin via npm with `npm install --save ejs-brunch`.

Or, do manual install:

* Add `"ejs-brunch": "~x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, use the GitHub URI
`"ejs-brunch": "munshkr/ejs-brunch"`.

There's no need to require ejs.js on your app bundle in Brunch, because this
plugin uses `ejs.compile()` with the `client: true` option.  This tells EJS to
include an implementation for the HTML-escaping function and error handlers on
each compile function.

### include()

You can use the `include()` local function in your templates:

```html
<!-- in 'app/foo.html.ejs' -->
<li id="<%= id %>"><%- include('foo/item.html', { id: id, name: name }) %></li>

<!-- in 'app/foo/item.html.ejs' -->
<span><%= name.toUpperCase() %> (<%= id %>)</span>
```

Path must be relative to the parent template file. Internally uses `require()`,
so files must be inside any of the *watched paths*, as defined in your Brunch
configuration file.

## License

The MIT License (MIT)

Copyright (c) 2016 Damián Silvani, Paul Miller (http://paulmillr.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
