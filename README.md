# Basic JS end-to-end tests

Simple tests for iOS native and web using [mocha](https://mochajs.org/) and
[wd](https://github.com/admc/wd).

### To run

**Note:** The native test uses iOS 10.0 and XCUITest, while the web test run
iOS 9.3 with Instruments (for illustration purposes). Since the former needs
Xcode 8+ and the latter needs Xcode 9.3, they cannot be run on the same appium
server. To run, close Appium, switch to the appropriate Xcode version, then
restart Appium and run the test against it.

Native test:
```
mocha -t 90000 -R spec ios-native-spec.js
```

Web test:
```
mocha -t 90000 -R spec ios-web-spec.js
```

### To run on Sauce Labs

To run on [Sauce Labs](https://saucelabs.com/), set the environment variable
`SAUCE` to anything _truthy_, and then run the command above. Credentials will
be read from the `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` environment variables.

E.g.:
```
SAUCE=1 mocha -t 90000 -R spec ios-web-spec.js
```

On Sauce Labs you will also be able to run both tests, so the following becomes
possible:
```
SAUCE=1 mocha -t 90000 -R spec *-spec.js
```
