# Cross browser test skeleton [![build status](https://secure.travis-ci.org/lawrencec/karma-test-skeleton.png)](http://travis-ci.org/lawrencec/karma-test-skeleton)

A skeleton stub project reminding me how to setup and run frontend js tests, with html fixtures, in multiple browsers concurrently using [Karma](http://karma-runner.github.io). 

Karma is a command line tool that will automatically run your tests in any browser/device and generate reports.

Out of the box configuration is supplied for Firefox, Chrome, PhantomJS and (via virtualbox virtual machines) IE9, IE10 and IE11. Native IE will probably work too as long as the correct browser name is used in the config; 'IE" instead of "IE9 - Win7" for example.

IE8 is also supported but the example test project uses [Chaijs](http://chaijs.com/) which doesn't support IE8 which means the tests fail in IE8. Removing the dependency on chai will enable the tests to run and pass in IE8.

The browsers that run natively will automatically open up a window and if configuration states so, will close automatically. Browsers in a VM will run headlessly and close automatically. If you need to see or interact with the test (i.e to debug), run the vm manually first before running the tests.

Tested on OSX and ubuntu. Should work anywhere where node and virtualbox is supported. 



## Install

### Dependencies

Run the following command after git clone.

``` bash
$ npm install .
```

### Installing virtual machines (Virtualbox VMs)

<code>iectrl</code> is used to automate the installation (and running) of windows VMs from Microsoft and also the running of the tests in the specified VMs.
As <code>iectrl</code> will download several GBs of data from [Microsoft](http://www.modern.ie/en-us/virtualization-tools) and by default it's text output is minimal and it will seem like it is hanging. Hence I like to enable verbose output mode. A shell alias like so works best:


``` bash
$ alias iectrl="DEBUG='iectrl:*' iectrl"
```

Installation of the VMs can be done using the following commands. You'll need virtualbox installed and about 50gb space to install all the VMs. Most of that space can be reduced afterwards by the shrink command.
Note for OSX Mavericks users, there are issues with virtual box 4.3 see [issue 6](https://github.com/xdissent/iectrl/issues/6) so best stick with 4.2 if you're a Mavericks user.

``` bash
# IE8 - WinXP
$ iectrl install "IE8 - WinXP"

# IE9 - Win7
$ iectrl install "IE9 - Win7"

# IE10 - Win7
$ iectrl install "IE10 - Win7"

# IE11 - Win7
$ iectrl install "IE11 - Win7"

#All WinXP browsers (6, 7, 8)
$ iectrl install WinXP

#All Win7 browsers (9, 10, 11)
$ iectrl install Win7

```

I've found that sometimes the download of the VM will hang so I tend to use curl to download the VM first. If you have the <code>iectrl</code> DEBUG environment variable enabled then <code>iectrl</code> will display the url to the VM. Use the following command to download the VM and re-run the relevant command from the above list:

``` bash
$ cd ~/.ievms
$ curl -O <vmUrl>
```

Then using virtualbox, start each vm manually once to ensure that the post-install scripts finish correctly. Also re-install the virtualbox guest additions for each VM. Strictly speaking, this steps should not be required and <code>iectrl</code> should do this. Sometimes, (50/50 in my experience), the tests won't run in the vm because the post-install script didn't complete or the additions didn't install. Most times I've managed to fix it by manually starting the vm and reinstalling the guest additions.

After all the VMs are installed, shrink the disk usage by executing the following commands:

``` bash
$ iectrl shrink "IE8 - WinXP"
$ iectrl shrink "IE9 - Win7"
```

The <code>iectrl</code> status command will give you information as to what is installed.

``` bash
$ iectrl status
IE8 - WinXP                     POWEROFF              ova missing           archive present       expires in a month    0 rearms left
IE9 - Win7                      POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left
IE10 - Win7                     POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left
IE11 - Win7                     POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left

```

## Run

There a few commands set up to run the tests, depending on the scenario required. These can be found in the scripts section of the <code>[package.json](https://github.com/lawrencec/karma-test-skeleton/blob/master/package.json)</code> file. Each command uses a different config file to configure itself. Each config shares a common config and only overrides what it needs. All provide html reports and code coverage reports in the /target folder. 

``` bash
# phantomjs only - useful for quick test runs and travis-ci
$ npm run test

# Firefox and keeps the browser window open; useful for debugging
$ npm run test-dev 

# Firefox, Chrome, IE9/10/11. Shuts down all browsers afterwards
$ npm run test-all 

# Firefox with karma in debug mode. Useful for debugging karma configuration
$ npm run test-debug 

# Firefox, Chrome, IE9/10/11 with junit output and cobertura output for code coverage. Useful for Jenkins-CI
$ npm run test-ci
```

### Overrides

Karma supports overrides via command line arguments. Unfortunately npm does not yet support passing of arguments via the npm run command but through environment variables, karma's configuration can still be overridden even when run via npm run.

#### Overriding Browsers

The browsers used to run the tests can be overridden via the <code>KARMA_BROWSERS</code> env var. The value given should be a comma separated list of browser names.

``` bash
$ KARMA_BROWSERS=PhantomJS,"IE9 - Win7" npm run test-dev
```

#### Overriding which type of tests are run (unit or integration)

By default the above commands will run both integration and unit tests. The unit and integration tests can be run independently by prefixing the command with an env variable called <code>KARMA\_TEST\_TYPE"</code>:

``` bash
# unit tests only
$ KARMA_TEST_TYPE=unit npm run test-dev
# integration tests only
$ KARMA_TEST_TYPE=integration npm run test-dev
```

### Debugging

If you want to debug a test, click the debug button in the opened window.

### Fixtures

Fixtures are available via

``` js
window.__html__
```

For example the fixtures/dom_elements.html is available as

``` js
window.__html__['test/fixtures/dom_elements.html']
```

and can be injected and removed from the document body as required. See integration tests for an example.



