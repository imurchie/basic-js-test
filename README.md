# Basic JS end-to-end tests

Simple tests for iOS native and web using [mocha](https://mochajs.org/) and
[wd](https://github.com/admc/wd).

### To run



Native test:
```
mocha -t 90000 -R spec ios-native-spec.js
```

Web test:
```
mocha -t 90000 -R spec ios-web-spec.js
```

Both tests:
```
mocha -t 90000 -R spec *-spec.js
```

### To run on Sauce Labs

To run on [Sauce Labs](https://saucelabs.com/), set the environment variable
`SAUCE` to anything _truthy_, and then run the command above. Credentials will
be read from the `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` environment variables.

E.g.:
```
SAUCE=1 mocha -t 90000 -R spec ios-web-spec.js
```
