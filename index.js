'use strict';

const ejs = require('ejs');

class EjsPlugin {
  constructor(config) {
    this.config = config && config.plugins && config.plugins.plugin;
  }

  // file: File => Promise[File]
  // Generates a compilation function from a EJS template string
  compile(file) {
    let template;
    try {
      template = ejs.compile(file.data);
    } catch(error) {
      console.error(error);
      return Promise.reject(error);
    } finally {
      console.log('done');
      return Promise.resolve({template});
    }
  }
}

EjsPlugin.prototype.brunchPlugin = true;
EjsPlugin.prototype.type = 'javascript';
EjsPlugin.prototype.pattern = /\.ejs$/;

module.exports = EjsPlugin;
