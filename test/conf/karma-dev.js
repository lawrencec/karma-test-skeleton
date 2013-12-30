var devConfig = require('./karma-common.js');

module.exports = function (config) {
    devConfig.singleRun = false;
    devConfig.logLevel = config.LOG_INFO;
    config.set(devConfig);
};