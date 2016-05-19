var webDriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;


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
    this.orderTotal = 0;

    this.calculateTotalProductCost = function() {
        var productRow = this.session.findElement(webDriver.By.xpath("//tr[contains(@class,'product_row')]"));

        var priceString = productRow.findElement(webDriver.By.xpath("//td//span[@class='pricedisplay']")).getText();
        //var price = parseFloat(priceString.substr(1));
        //var quantityString = productRow.findElement(webDriver.By.xpath("//td[contains(@class,'wpsc_product_quantity')]//input[@name='quantity']")).getText().toString();
        //var quantity = parseFloat(quantityString);
        //var expectedTotalString = toString(quantity*price);
        productRow.findElement(webDriver.By.xpath("//td[contains(@class,'wpsc_product_price')]//span[.='$"+priceString+"']"));
    };

    this.checkout = function(){
        this.session.wait(until.elementLocated(By.xpath("//span[.='Continue']")));
        this.session.findElement(webDriver.By.xpath("//span[.='Continue']")).click();
        this.waitForCheckoutFormToLoad();
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