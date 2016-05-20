var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;
var assert = require('chai').assert;


module.exports = function(driver){

    this.session = driver;
    this.BILLINGEMAIL = "//input[@title='billingemail']";
    this.BILLINGFIRSTNAME = "//input[@title='billingfirstname']";
    this.BILLINGLASTNAME = "//input[@title='billinglastname']";
    this.BILLINGADDRESS = "//textarea[@title='billingaddress']";
    this.BILLINGCITY = "//input[@title='billingcity']";
    this.BILLINGSTATE = "//input[@title='billingstate']";
    this.BILLINGCOUNTRY = "//select[@title='billingcountry']";
    this.BILLINGPHONE = "//input[@title='billingphone']";

    this.calculateAndValidateTotalProductCost = function() {
        var productRow = this.session.findElement(webDriver.By.xpath("//tr[contains(@class,'product_row')]"));
        var productPrice = 0;
        var productQuantity = 0;
        var expectedTotal = 0;
        var expectedTotalString = "";

        productRow.findElement(webDriver.By.xpath("//td//span[@class='pricedisplay']")).getInnerHtml().then(function(html){
            productPrice = parseFloat(html.toString().substr(1)).toFixed(2);
            console.log("Price: "+productPrice);
        });
        productRow.findElement(webDriver.By.xpath("//td[contains(@class,'wpsc_product_quantity')]//input[@name='quantity']")).getAttribute("value").then(expectedTotal = function(value){
            productQuantity = parseFloat(value.toString()).toFixed(2);
            console.log("Quantity String: "+productQuantity);
            expectedTotal = productPrice*productQuantity;
            expectedTotalString = expectedTotal.toFixed(2).toString();
            console.log("Total Price: "+expectedTotalString);
            productRow.findElement(webDriver.By.xpath("//td[contains(@class,'wpsc_product_price')]//span[.='$"+expectedTotalString+"']"));
            return expectedTotal;
        });
        return expectedTotal;
    };

    this.checkout = function(){        
        this.session.findElement(webDriver.By.xpath(this.BILLINGEMAIL)).sendKeys("TestUser@test.com");
        this.session.findElement(webDriver.By.xpath(this.BILLINGFIRSTNAME)).sendKeys("Test");
        this.session.findElement(webDriver.By.xpath(this.BILLINGLASTNAME)).sendKeys("User");
        this.session.findElement(webDriver.By.xpath(this.BILLINGADDRESS)).sendKeys("123 Street");
        this.session.findElement(webDriver.By.xpath(this.BILLINGCITY)).sendKeys("Austin");
        this.session.findElement(webDriver.By.xpath(this.BILLINGSTATE)).sendKeys("Texas");
        this.session.findElement(webDriver.By.xpath(this.BILLINGCOUNTRY)).click();
        this.session.findElement(webDriver.By.xpath("//option[.='USA']")).click();
        this.session.findElement(webDriver.By.xpath(this.BILLINGPHONE)).sendKeys("123-456-7890");
        this.session.findElement(webDriver.By.xpath("//input[@id='shippingSameBilling']")).click();
        this.waitForCheckoutFormToLoad();
        //this.session.findElement(webDriver.By.xpath("//input[@name='submit']")).click();
    };
    
    this.continueToCheckoutForm = function(){
        this.session.wait(until.elementLocated(By.xpath("//span[.='Continue']")));
        this.session.findElement(webDriver.By.xpath("//span[.='Continue']")).click();
        this.waitForCheckoutFormToLoad();
    };
    
    this.validateOrderTotal = function(expectedOrderTotal){
        this.expectedTotal = expectedOrderTotal;
        var orderTotalString = this.expectedTotal.toFixed(2).toString();
        this.session.findElement(webDriver.By.xpath("//tr[@class='total_price total_item']//span/span")).getInnerHtml().then(function(html) {
            var expectedTotalString = "$"+orderTotalString;
            assert.equal(html,expectedTotalString);
        });
    };

    this.removeCartItem = function(itemName) {
        this.waitForCheckoutFormToLoad();
        this.session.findElement(webDriver.By.xpath("//tr[contains(@class,'product_row')]//a[contains(.,'"+itemName+"')]/../..//input[@value='Remove']")).click();        
    };
        
     this.validateCartIsEmpty= function() {
         this.session.findElement(webDriver.By.xpath("//div[@class='entry-content' and contains(.,'Oops, there is nothing in your cart.')]"))
     };

    this.waitForCheckoutFormToLoad = function() {
        this.session.wait(until.elementLocated(By.id("wpsc_shopping_cart_container")));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGEMAIL)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGFIRSTNAME)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGLASTNAME)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGADDRESS)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGCITY)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGSTATE)));
        this.session.wait(until.elementLocated(By.xpath(this.BILLINGCOUNTRY)));
        this.session.wait(until.elementLocated(By.name("submit")));
    };
};