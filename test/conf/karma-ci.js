var ciConfig = require('./karma-common.js');

module.exports = function (config) {
    ciConfig.browsers = [
        'Firefox',
        'Chrome',
        'IE8 - WinXP',
        'IE9 - Win7',
        'IE10 - Win7'
    ];
    ciConfig.singleRun = true;
    ciConfig.reporters.push('junit');
    ciConfig.junitReporter = {        
        outputFile: 'target/test-reports/test-results.xml'
    };
    ciConfig.coverageReporter.type = 'cobertura';
    ciConfig.logLevel = config.LOG_INFO;
    config.set(ciConfig);
};