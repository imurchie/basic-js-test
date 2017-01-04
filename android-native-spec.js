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
  'http://appium.github.io/appium/assets/ApiDemos-debug.apk' :
  path.resolve(__dirname, 'app', 'ApiDemos-debug.apk');

describe('Android - native', function () {
  this.timeout(240 * 1000);
  let passed = false;

  let driver;
  before(() => {
    driver = initSession({
      platformName: 'Android',
      deviceName: 'Android',
      platformVersion: '7.0',
      browserName: '',
      app: app,
      appiumVersion: '1.6',
      noReset: true,
      name: 'Basic Android native test',
    });
    return driver;
  });
  after((done) => {
    deleteSession(passed).nodeify(done);
  });

  describe('find and click', () => {
    it(`should be able to find 'Animation' and click it`, (done) => {
      driver
        .elementByAccessibilityId('Animation')
          .click()
        .elementByAccessibilityId('Bouncing Balls')
          .should.eventually.exist
        .then(() => {
          // if anything throws, this will be skipped, so set passed
          passed = true;
        })
        .nodeify(done);
    });
  });
});
