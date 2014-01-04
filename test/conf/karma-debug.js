var debugConfig = require('./karma-common.js');

module.exports = function (config) {
    debugConfig.browsers = debugConfig.getBrowsers() || [
        'Firefox'
    ];
    debugConfig.logLevel = config.LOG_DEBUG;
    config.set(debugConfig);
};