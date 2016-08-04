const expect = require('chai').expect;
const Plugin = require('./');

describe('Plugin', () => {
  let plugin;

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
    const content  = '<p><%= "hello, world!".toUpperCase() %> <%= locals.var %></p>';
    const expected = '<p>HELLO, WORLD! foo</p>';

    plugin.compile({data: content}).then(module => {
      try {
        expect(module.template({var: 'foo'})).to.equal(expected);
        done();
      } catch(err) {
        done(err);
      }
    }, error => expect(error).not.to.be.ok);
  });
});
