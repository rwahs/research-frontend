# Research Frontend for CollectiveAccess

Public research frontend SPA for CollectiveAccess.

[![Build Status](https://secure.travis-ci.org/rwahs/research-frontend.png?branch=master)](http://travis-ci.org/rwahs/research-frontend)

## Development Environment Setup

You need Node.js 6.x installed.  It may work on previous versions (5.x) but this is untested.  For Linux development
environments, `nvm` is recommended: https://github.com/creationix/nvm.  

To install dependencies, execute the following commands in the project's root directory:

    npm install -g gulp bower
    npm install
    bower install

This (1) installs global dependencies, (2) installs local development and automation dependencies, and (3) installs
application dependencies.  You can check `package.json` and `bower.json` to see what will be installed.

### CA Web Server setup

In order to perform operations via the web services, the web server running Collective Access needs to allow
Cross-Origin Resource Sharing (CORS) requests.  Assuming you are using Apache2, use the following in the relevant
`VirtualHost` directive:

    Header set Access-Control-Allow-Credentials "true"
    Header set Access-Control-Allow-Origin "http://localhost:8888"

You also need to enable the `headers` module:

    a2enmod headers

And restart the web server service.

## Automation

The project uses `gulp` to automate many processes in the development environment.

### Default (no arguments)

Running `gulp` without any arguments is the equivalent to running `gulp qa`, `gulp less` and `gulp watch`, as described
below.

    gulp

### Performing QA

To run linter, code style checker and unit tests:

    gulp qa

### Compiling LESS

To convert LESS, including the Bootstrap LESS source, into a single CSS file for use in the browser:

    gulp less

### Watching files for changes

To watch files for changes and perform either QA or LESS compilation as required (depending on the file modified), use:

    gulp watch

To watch only for QA changes, or only for LESS changes, respectively, use:

    gulp watch:qa
    gulp watch:less

### Running a Local Server

To run a local server:

    gulp server

Then access the site on http://localhost:8888/.
