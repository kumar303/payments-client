'use strict';


'use strict';

var defaults = require('lodash.defaults');
var karmaConfig = require('./karma.shared');
var browsers = require('mozilla-payments-saucelabs-browsers');


module.exports = function (config) {

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and ' +
                'SAUCE_ACCESS_KEY environment variables are set.');
    throw new Error('Missing SAUCE_USERNAME and SAUCE_ACCESS_KEY env vars');
  }

  karmaConfig.plugins.push('karma-sauce-launcher');
  karmaConfig.reporters.push('saucelabs');

  config.set(defaults({
    // Increase timeout in case connection in CI is slow
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 30000,
    captureTimeout: 120000,
    customLaunchers: browsers,
    browsers: Object.keys(browsers),
    port: 9876,
    sauceLabs: {
      testName: 'Payments Client Unit Tests',
      recordScreenshots: false,
      connectOptions: {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        tunnelIdentifier: 'autoGeneratedTunnelID',
      },
    },
  }, karmaConfig));
};
