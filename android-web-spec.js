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

const browserName = process.env.SAUCE ? 'browser' : 'Chrome';
const platformVersion = process.env.SAUCE ? '4.4' : '7.0';
const appiumVersion = process.env.SAUCE ? '1.5' : '1.6';

describe('Android - web', function () {
  this.timeout(240 * 1000);
  let passed = false;

  let driver;
  before(() => {
    driver = initSession({
      platformName: 'Android',
      deviceName: 'Android Emulator',
      platformVersion: platformVersion,
      browserName: browserName,
      app: '',
      appiumVersion: appiumVersion,
      noReset: true,
      name: 'Basic Android web test',
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

  describe('logs', () => {
    it(`should be able to get the 'browser' logs`, (done) => {
      driver
        .get('https://www.abuhamdi.com/')
        .contexts()
          .should.eventually.have.length.above(1)
        .logTypes()
          .should.eventually.include('browser')
        .log('browser')
          .should.eventually.have.length
          .then(() => {
            // if anything throws, this will be skipped, so set passed
            passed = true;
          })
        .nodeify(done);
    });
  });
});
