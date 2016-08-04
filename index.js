'use strict';

var ejs = require('ejs');

class EjsPlugin {
  constructor(config) {
    this.config = config && config.plugins && config.plugins.plugin;
  }

  // file: File => Promise[File]
  // Generates a compilation function from a EJS template string
  compile(params) {
    // TODO Make client configurable
    var options = {
      client: true
    };

    try {
      // Generate compile function
      var fn = ejs.compile(params.data, options);

      // Return a callable function which will execute the function
      // created by the source-code, with the passed data as locals
      // Add a local `include` function which uses require to load files
      var returnedFn = function(data) {
        var include = function(includePath, includeData) {
          var _fn = require(includePath);
          return _fn(includeData);
        };
        return fn(data, null, include);
      };

      var module = 'var fn = ' + fn + ';\n' +
        'var __module = ' + returnedFn + ';\n' +
        'if (typeof define === \'function\' && define.amd) {\n' +
        '  define([], function() {\n' +
        '    return __module;\n' +
        '  });\n' +
        '} else if (typeof module === \'object\' && module && module.exports) {\n' +
        '  module.exports = __module;\n' +
        '} else {\n' +
        '  __module;\n' +
        '}';

      return Promise.resolve(module);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

EjsPlugin.prototype.brunchPlugin = true;
EjsPlugin.prototype.type = 'javascript';
EjsPlugin.prototype.pattern = /\.ejs$/;

module.exports = EjsPlugin;
