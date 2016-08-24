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
        .findByModel('view.user.username')
          .getVisibleText()
          .then(function(text) {
            assert.strictEqual(text, 'conor', 'user should be logged in');
          });
    }
  });
});
