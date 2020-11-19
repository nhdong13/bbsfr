const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const $browser = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var assert = require('assert');

$browser.get('http://localhost:3000/').then(function(){
  // Check the H1 title matches "Home Page"
  return $browser.findElement(webdriver.By.css('h1')).then(function(element){
    return element.getText().then(function(text){
      assert.equal('Home Page', text, 'Page H1 title did not match');
    });
  });
}).then(function(){
  // Check that the external link matches "https://www.iana.org/domains/example"
  return $browser.findElement(webdriver.By.css('div > nav > div > span > a.nav-link')).then(function(element){
    return element.getAttribute('href').then(function(link){
      assert.equal('http://localhost:3000/checkout', link, 'More information link did not match');
    });
  });
});