# Cross browser test skeleton

A skeleton stub project showing how to run js tests, with html fixtures, in multiple browsers using karma.

## Install

### Dependencies

``` bash
npm install .
```

### Installing virtual machines

iectrl is used to automate the installation (and running) of windows VMs from Microsoft and also the running of the tests in the specified VMs.
As iectrl will download several GBs of data from microsoft.ie, it will seem like it is hanging. So it's best to enable it in verbose output mode. A shell alias like so works best:


``` bash
alias iectrl="DEBUG='iectrl:*' iectrl"
```

Installation of the VMs can be done using the following commands. You'll need virtualbox installed and about 50gb space to install all the VMs. Most of that space can be reduced afterwards by the shrink command.
Note for OSX Mavericks users, there are issues with virtual box 4.3 see [issue 6](https://github.com/xdissent/iectrl/issues/6) so best stick with 4.2 if you're a Mavericks user.

``` bash
# IE8 - WinXP
iectrl install "IE8 - WinXP"

# IE9 - Win7
iectrl install "IE9 - Win7"

# IE10 - Win7
iectrl install "IE10 - Win7"

# IE11 - Win7
iectrl install "IE11 - Win7"

#All WinXP browsers (6, 7, 8)
iectrl install WinXP

#All Win7 browsers (9, 10, 11)
iectrl install Win7

```

I've found that sometimes the download of the VM will hang so I tend to use curl to download the VM first. If you have the iectrl DEBUG environment variable enabled then iectrl will display the url to the VM. Use the following command to download the VM:

``` bash
cd ~/.ievms
curl -O <vmUrl>
```

After all the VMs are installed, shrink the disk usage by executing the following commands:

``` bash
iectrl shrink "IE8 - WinXP"
iectrl shrink "IE9 - Win7"
```

The iectrl status command will give you information as to what is installed.

``` bash
$ iectrl status
IE8 - WinXP                     POWEROFF              ova missing           archive present       expires in a month    0 rearms left
IE9 - Win7                      POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left
IE10 - Win7                     POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left
IE11 - Win7                     POWEROFF              ova missing           archive present       expires in 3 months   5 rearms left

```

Finally to enable iectrl to communicate with the browsers correctly, open up each VM in virtualbox and (re)install virtualbox additions.

## Run

### Developing

Whilst developing, the following command will execute your tests in Firefox and Chrome, continuously after every change. It will also provide a coverage report (in html form) in the ./target/test-reports directory.

``` bash
# Runs karma start test/conf/karma-dev.js
npm test
```

By default the above command will run both integration and unit tests. The unit and integration tests can be run independently via an env variable called "KARMA\_TEST\_TYPE":

``` bash
# unit tests only
KARMA_TEST_TYPE=unit npm test
# integration tests only
KARMA_TEST_TYPE=unit npm test
```

The above command will open up the configured browsers and run the tests in them. If you want to debug a test, click the debug button in the opened window.

Fixtures are available via

``` js
window.__html__
```

For example the fixtures/dom_elements.html is available as

``` js
window.__html__['test/fixtures/dom_elements.html']
```

and can be injected and removed from the document body as required. See integration tests for an example.

Debug mode is often useful to debug karma settings. Any errors or mis-configured settings will be shown in the console.

``` bash
# Runs karma start test/conf/karma-debug.js
npm debug
```

### CI

Within a CI run, the following command will execute your tests in Firefox, Chrome, IE8, IE9 and IE10 (presuming the slave has the required vms installed).
It will also provide a junit coverage report in the ./target directory, suitable for a CI server.

``` bash
# Runs karma start test/conf/karma-ci.js
npm test
```



