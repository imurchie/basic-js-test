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

describe('iOS - web', function () {
  this.timeout(240 * 1000);
  let passed = false;

  let driver;
  before(() => {
    driver = initSession({
      platformName: 'iOS',
      deviceName: 'iPhone 6',
      platformVersion: '9.3',
      browserName: 'Safari',
      app: '',
      nativeWebTap: true,
      automationName: 'Appium',
      appiumVersion: '1.6',
      noReset: true,
      name: 'Basic iOS web test',
    });
    return driver;
  });
  after((done) => {
    deleteSession(passed).nodeify(done);
  });

  describe('find and click', () => {
    it(`should be able to get a page and follow a link`, (done) => {
      driver
        .get('https://www.abuhamdi.com/')
        .elementByLinkText('MENU')
          .click()
        .elementByLinkText('About')
          .click()
        .url()
          .should.eventually.eql('https://www.abuhamdi.com/bio-1/')
        .then(() => {
          // if anything throws, this will be skipped, so set passed
          passed = true;
        })
        .nodeify(done);
    });
  });
});
