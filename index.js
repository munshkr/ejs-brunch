'use strict';

var ejs = require('ejs');

class EjsPlugin {
  constructor(config) {
    this.config = config && config.plugins && config.plugins.plugin;
  }

  // file: File => Promise[File]
  // Generates a compilation function from a EJS template string
  compile(file) {
    try {
      var fn = ejs.compile(file.data);
      return Promise.resolve({template: fn});
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

EjsPlugin.prototype.brunchPlugin = true;
EjsPlugin.prototype.type = 'javascript';
EjsPlugin.prototype.pattern = /\.ejs$/;

module.exports = EjsPlugin;
