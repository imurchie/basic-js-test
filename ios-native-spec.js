"use strict";

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let wd = require('wd');
let path = require('path');
let driverInit = require('./driver-init'),
    initSession = driverInit.initSession,
    deleteSession = driverInit.deleteSession;


// set up chai and promises
chai.should();
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// choose local or remote app
const app = process.env.SAUCE ?
  'http://appium.github.io/appium/assets/UICatalog7.1.app.zip' :
  path.resolve(__dirname, 'app', 'UICatalog-iphonesimulator.app');

describe('iOS - native', function () {
  this.timeout(240 * 1000);
  let passed = false;

  let driver;
  before(() => {
    driver = initSession({
      platformName: 'iOS',
      deviceName: 'iPhone 6',
      platformVersion: '10.0',
      browserName: '',
      app: app,
      automationName: 'XCUITest',
      appiumVersion: '1.6',
      noReset: true,
      name: 'Basic iOS native test',
    });
    return driver;
  });
  after((done) => {
    deleteSession(passed).nodeify(done);
  });

  describe('find and click', () => {
    it(`should be able to find 'Buttons' and click it`, (done) => {
      driver
        .elementByAccessibilityId('Buttons')
          .click()
        .elementsByClassName('XCUIElementTypeButton')
          .should.eventually.have.length.above(4)
        .then(() => {
          // if anything throws, this will be skipped, so set passed
          passed = true;
        })
        .nodeify(done);
    });
  });
});
