define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'log in',

    'users log in': function() {
      return this.remote
        .get(require.toUrl('http://localhost:3000/'))
        .setFindTimeout(5000)
        .findById('signin-button')
          .click()
          .end()
        .findById('username')
          .click()
          .type('conor')
          .end()
        .findById('password')
          .click()
          .type('conor')
          .end()
        .findById('submit')
          .click()
          .end()
        .sleep(500)
        .findById('loggedinusername')
        .getVisibleText()
          .then(function(text) {
            assert.strictEqual(text, 'conor', 'user should be logged in');
          });
    }
  });
  registerSuite({
    name: 'log out',

    'users log out': function() {
      return this.remote
        .findById('loggedinusername')
          .click()
          .end()
        .findById('signout-button')
          .click()
          .end()
        .findById('signin-button')
        .getVisibleText()
          .then(function(text) {
            assert.strictEqual(text, 'Sign In', 'user should be logged out');
          });
    }
  });
});
