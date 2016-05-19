var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;


module.exports = function(driver){

    this.session = driver;

    this.logIn = function(username, password){
        this.session.wait(until.elementLocated(By.name('s')));
        this.session.findElement(webDriver.By.name('log')).sendKeys(username);
        this.session.findElement(webDriver.By.name('pwd')).sendKeys(password);
        this.session.findElement(webDriver.By.name('submit')).click();        
    };
};