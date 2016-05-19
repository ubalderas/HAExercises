"use strict";
var webDriver = require('selenium-webdriver');
var HomePage = require('./HomePage');
var SearchResultsPage = require('./SearchResultsPage');
var DetailsPage = require('./DetailsPage');
var CheckoutPage = require('./CheckoutPage');
var AccountPage = require('./AccountPage');

function StoreTestSuite() {

    this.setUp = function() {
        this.session = new webDriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
        this.session.manage().window().maximize();
        this.homePage = new HomePage(this.session);
        this.searchResultsPage = new SearchResultsPage(this.session);
        this.detailsPage = new DetailsPage(this.session);
        this.checkoutPage = new CheckoutPage(this.session);
        this.accountPage = new AccountPage(this.session);
    };

    this.orderProductTest = function() {
        this.setUp();
        this.homePage.NavigateToHomePage();
        this.homePage.searchForProduct('Iphone 4s Black');
        this.searchResultsPage.openProductDetails('Apple iPhone 4S 16GB SIM-Free – Black');
        this.detailsPage.addProductToCart();
        this.detailsPage.goToCheckoutFromAddToCart();
        this.checkoutPage.checkout();
        this.tearDown();
    };

    this.accountChangesTest = function() {
        this.setUp();
        this.homePage.NavigateToHomePage();
        this.homePage.goToMyAccount();
        this.accountPage.logIn("TestUser", "123456");
        this.tearDown();
    };

    this.orderProductCancelTest = function() {
        this.setUp();
        this.homePage.NavigateToHomePage();
        this.homePage.searchForProduct('Iphone 4s Black');
        this.searchResultsPage.openProductDetails('Apple iPhone 4S 16GB SIM-Free – Black');
        this.detailsPage.addProductToCart();
        this.detailsPage.goToCheckoutFromAddToCart();
        this.checkoutPage.removeCartItem('Apple iPhone 4S 16GB SIM-Free - Black');
        this.checkoutPage.validateCartIsEmpty();
        this.tearDown();
    };
        
    this.tearDown = function() {
        this.session.quit();
    };
}


var TestSuite = new StoreTestSuite();
TestSuite.orderProductTest();
//TestSuite.accountChangesTest();
TestSuite.orderProductCancelTest();

