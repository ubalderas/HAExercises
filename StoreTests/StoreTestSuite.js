"use strict";
var webDriver = require('selenium-webdriver');
var HomePage = require('./HomePage');
var SearchResultsPage = require('./SearchResultsPage');
var DetailsPage = require('./DetailsPage');
var CheckoutPage = require('./CheckoutPage');
var AccountPage = require('./AccountPage');
var expect = require('chai').expect;
var request = require('request');

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
        var expectedOrderTotal = this.checkoutPage.calculateAndValidateTotalProductCost();
        this.checkoutPage.continueToCheckoutForm();
        this.checkoutPage.validateOrderTotal(expectedOrderTotal);
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

    this.altFuelStationsTest = function() {
        request
            .get("https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?api_key=KHdXfK9qcZwK9rnw19v29C1TgEYY5Cf4xgqgMpbi&location=Austin+TX&ev_network=ChargePoint+Network", function(error, response, body){
                expect(response.statusCode).to.equal(200);
                var cleaned = body.trim();
                var json = JSON.parse(cleaned);
                var jsonFuelStations = json.fuel_stations;
                var stationNames = [];
                for(var station in jsonFuelStations){
                    stationNames.push(jsonFuelStations[station].station_name);
                }
                expect(stationNames).to.include("HYATT AUSTIN");

                for(station in jsonFuelStations){
                    if(jsonFuelStations[station].station_name == "HYATT AUSTIN"){
                        var stationId = jsonFuelStations[station].id;
                    }
                }

                request
                    .get("https://api.data.gov/nrel/alt-fuel-stations/v1/nearest.json?api_key=KHdXfK9qcZwK9rnw19v29C1TgEYY5Cf4xgqgMpbi&location=Austin+TX&ev_network=ChargePoint+Network", function(error, response, body){
                        expect(response.statusCode).to.equal(200);
                        var cleaned = body.trim();
                        var json = JSON.parse(cleaned);
                        var jsonFuelStations = json.fuel_stations;
                        for(station in jsonFuelStations){
                            if(jsonFuelStations[station].id == stationId){
                                var stationAddress = jsonFuelStations[station].street_address;
                                var stationCity = jsonFuelStations[station].city;
                                var stationState = jsonFuelStations[station].state;
                                var stationZip = jsonFuelStations[station].zip;
                                expect(stationAddress).to.equal("208 Barton Springs Rd");
                                expect(stationCity).to.equal("Austin");
                                expect(stationState).to.equal("TX");
                                expect(stationZip).to.equal("78704");
                                console.log(jsonFuelStations[station]);
                            }
                        }
                    });
            });

    };

    this.tearDown = function() {
        this.session.quit();
    };
}


var TestSuite = new StoreTestSuite();
TestSuite.orderProductTest();
//TestSuite.accountChangesTest();
//TestSuite.orderProductCancelTest();
//TestSuite.altFuelStationsTest();

