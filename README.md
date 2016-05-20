# HAExercises
Some example Automation exercises for GUI and API Testing

A couple of notes:

- Intended to use mocha as my Testing Framework, but given that I've only been developing on Node.js this week,
  I've had some problems understanding and using promises and Asynchronous Javascript execution correctly.
- Ended up creating my own TestSuite Class with it's own Test Case methods inside very similarly structured to what I
  would do using Python. Unintended consequence: less dependencies needed to be able to run my Test scripts.
- The package.json file includes some dependencies that are not there, given that I have a couple files that are still
  not fully functional using Mocha.
- The first Test for ordering a Product (Iphone 4s Black) does not click submit at the very end, due to some timing
  issues and bugs found on the Store application, that included some loading in between filling the billing address
  and checking the box to make the shipping address the same. The Totals appear disappear, which I wasn't able to
  reproduce consistently to be able to deal with it in a deterministic way.
- I was not able to get signed up for login credentials to be able to finish the test for Validating changes made to the
  Account. Confirmation emails were lost, or maybe I'm missing something :( .
- The API test for the Alternate Fuel Stations was done fully on a Test Case on the Test Suite Class. I understand that
  the expectation was probably to abstract methods to find the "Hyatt" Station first and extract the ID, along with
  another method to use that ID to generate another request that would extract the address, but I didn't want to spend
  more time without providing some code for you to evaluate, given that I'm still in the process of understanding
  promises and Asynchronous Javascript Execution.
- I intend to attach the other exercises on an email, but I've also included the files in this repo, just in case.
- I intend to continue to work on the mocha version of the TestSuite, and I might be able to finish it up sometime in
  the next couple of days.


The only requirements to be able to run my scripts are the following:
1. Download or clone repo.
2. Have node.js installed
3. Install the selenium-webdriver npm package under the StoreTests directory: npm install selenium-webdriver
4. Install the chai npm package under the StoreTests directory: npm install chai
5. Install the request npm package under the StoreTests directory: npm install request
6. The tests can be run via the command line, on the StoreTests directory using node.js: node StoreTestSuite.js
7. Alternatively, I installed the WebStorm IDE from Jetbrains, and you can just run the StoreTestSuite.js file
