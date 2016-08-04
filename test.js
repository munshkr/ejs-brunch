var expect = require('chai').expect;
var Plugin = require('./');

describe('Plugin', () => {
  var plugin;

  beforeEach(() => {
    plugin = new Plugin({});
  });

  it('should be an object', () => {
    expect(plugin).to.be.ok;
  });

  it('should have a #compile method', () => {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content  = '<p><%= "hello, world!".toUpperCase() %> <%= locals.var %></p>';
    var expected = '<p>HELLO, WORLD! foo</p>';

    plugin.compile({data: content}).then(module => {
      try {
        var tpl = eval(module);
        expect(tpl({var: 'foo'})).to.equal(expected);
        done();
      } catch(err) {
        done(err);
      }
    }, error => expect(error).not.to.be.ok);
  });

  it('should define an include function', function(done) {
    var require = function(_path) {
      return function(data) { return "<span>" + data.bar + "</span>" };
    };
    var content  = '<p><%- include("foo", { bar: 1 }) %></p>';
    var expected = '<p><span>1</span></p>';

    plugin.compile({data: content}).then(module => {
      try {
        var tpl = eval(module);
        expect(tpl()).to.equal(expected);
        done();
      } catch(err) {
        done(err);
      }
    }, error => expect(error).not.to.be.ok);
  });
});
