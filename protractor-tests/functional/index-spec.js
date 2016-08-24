describe('angularjs homepage title', function() {
  it('should have a title', function() {
    browser.get('https://farmerstable.herokuapp.com/');

    expect(browser.getTitle()).toEqual('Angular Farmer\'s Table');

    // element(by.model('')).sendKeys('write first protractor test');
    // element(by.css('[value="add"]')).click();
    //
    // var todoList = element.all(by.repeater('todo in todoList.todos'));
    // expect(todoList.count()).toEqual(3);
    // expect(todoList.get(2).getText()).toEqual('write first protractor test');
    //
    // // You wrote your first test, cross it off the list
    // todoList.get(2).element(by.css('input')).click();
    // var completedAmount = element.all(by.css('.done-true'));
    // expect(completedAmount.count()).toEqual(2);
  });
});
describe('users can sign in', function() {
  it('should have a signin form', function() {
    expect(element(by.model("view.userame"))).toEqual();
    // expect(element(by.model("view.password"))).toExist();
    // expect(element(by.css("#submit"))).toExist();
    // element(by.model('view.username')).sendKeys('conor');
    // element(by.model('view.password')).sendKeys('conor');
    // element(by.css('#submit')).click();
    // expect(element(by.css('#username'))).toEqual('conor');
  });
});
