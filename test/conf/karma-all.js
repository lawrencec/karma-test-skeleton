var allConfig = require('./karma-common.js');

module.exports = function (config) {
    allConfig.browsers = [
        'Firefox',
        'Chrome',
        'IE8 - WinXP',
        'IE9 - Win7',
        'IE10 - Win7'
    ];
    allConfig.logLevel = config.LOG_DEBUG;
    config.set(allConfig);
};