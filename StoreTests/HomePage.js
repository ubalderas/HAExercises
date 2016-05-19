var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;


module.exports = function(driver){
    
    this.session = driver;

    this.NavigateToHomePage = function(){
        this.session.get('http://store.demoqa.com');
    };
    
    this.searchForProduct = function(searchString){
        this.session.wait(until.elementLocated(By.name('s')));
        this.session.findElement(webDriver.By.name('s')).sendKeys(searchString);
        this.session.findElement(webDriver.By.name('s')).sendKeys(webDriver.Key.RETURN);
    };

    this.goToMyAccount = function() {
        this.session.wait(until.elementLocated(By.id('account')));
        this.session.findElement(webDriver.By.id('account')).click();
    }
};

