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

## Development Environment Automation

The project uses `gulp` to automate many processes in the development environment.

### Default (no arguments)

Running `gulp` without any arguments is the equivalent to running `gulp clean`, `gulp qa`, `gulp build` and
`gulp watch`, as described below.

    gulp

### Performing QA

To run linter, code style checker and unit tests:

    gulp qa

### Local Builds

A local build refers to the processing required to run the applicaiton locally.  Currently this consists solely of
compiling LESS, including the Bootstrap LESS source, into a single CSS file for use in the browser:

    gulp build

There is a subtask that is called automatically when required, but which can also be used to clean up "manually",
without performing another build:

    gulp build:clean

### Watching files for changes

To watch files for changes and perform either QA or local builds as required (depending on the file modified), use:

    gulp watch

To watch only for QA changes, or only for LESS changes, respectively, use:

    gulp watch:qa
    gulp watch:less

### Running a Local Server

To run a local server:

    gulp server

Then access the site on http://localhost:8888/.

## Packaging

When running on a server, the application is expected to consist of only a small number of files:

* `index.html`, the container web page
* `application.js`, the compiled, concatenated and compressed javascript application
* `main.css`, the compiled, concatenated and compressed CSS file
* `images` directory containing images

### Environments

An environment is a string that identifies the setting of the application.  You can pass an `--env` argument to any
`gulp` task to set the environment.  However the local development related tasks will ignore the environment setting;
this is used for packaging only.

The following examples use an environment of `staging`.  The other accepted value is `uat`, and `production` will be
supported in future.

### Packaging Automation

To generate the package files, use the `package` task in the desired environment (see above):

    gulp --env=staging package

This actually runs a suite of separate packaging processes (see `gulpfile.js` for details), which results in the files
mentioned above being created in an environment-specific subdirectory of the `dist` directory, e.g. `dist/staging`.

There is a task that cleans up a previous packaging result, as above this must be run in the relevant environment:

    gulp --env=staging package:clean

### Local Package Server

It is possible to run the packaged application locally; again the environment is required:

    gulp --env=staging dist-server

This server runs on a different port at http://localhost:8889/.  This is intended for final integration testing before
a deployment.  Note that the environment-specific configuration within the application, i.e. the selection of a module
under `config/env`, will also be determined by the environment setting.  This means that the module must exist and the
target CA instance must be accessible, in order for the application to run correctly.

### Deployment

In order to deploy the application to S3 you need to have the relevant AWS credentials set up. In order to do this add
the following to your ~/.aws/credentials file:

    [rwahs]
    aws_secret_access_key = <access key for research-frontend-deploy user>
    aws_access_key_id = <access key ID for research-frontend-deploy user>

Deploying to the different environments is done as follows:

    gulp --env <environment> deploy
