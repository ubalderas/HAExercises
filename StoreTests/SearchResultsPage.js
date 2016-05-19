var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;


module.exports = function(driver){
    
    this.session = driver;
    
    this.openProductDetails = function(productName){
        this.session.wait(until.elementLocated(By.xpath("//a[.='"+productName+"']")));
        this.session.findElement(webDriver.By.xpath("//a[.='"+productName+"']")).click();
    };
};

