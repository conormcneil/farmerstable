define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'log in',

        'log in form': function () {
            return this.remote
                .get(require.toUrl('http://localhost:3000/'))
                .setFindTimeout(5000)
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
                .findById('loggedinusername')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'conor!',
                        'username should be displayed when the user is logged in');
                });
        }
    });
});
