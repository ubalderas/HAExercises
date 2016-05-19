var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;

module.exports = function(driver){
    
    this.session = driver;
    
    this.addProductToCart = function(){
        this.session.wait(until.elementLocated(By.xpath("//input[@value='Add To Cart']")));
        this.session.findElement(webDriver.By.xpath("//input[@value='Add To Cart']")).click();
    };
    
    this.goToCheckoutFromAddToCart = function() {
        this.session.wait(until.elementLocated(By.css('a.go_to_checkout')));
        this.session.findElement(webDriver.By.css('a.go_to_checkout')).click();
    }
};

