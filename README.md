# Research Frontend for CollectiveAccess

Public research frontend SPA for CollectiveAccess.

## Development Environment Setup

You need Node.js 6.x installed.  It may work on previous versions (5.x) but this is untested.  For Linux development  
environments, `nvm` is recommended: https://github.com/creationix/nvm.  

To install dependencies, execute the following commands in the project's root directory:

    npm install -g gulp bower
    npm install
    bower install

This (1) installs global dependencies, (2) installs local development and automation dependencies, and (3) installs 
application dependencies.  You can check `package.json` and `bower.json` to see what will be installed.

## Automation

The project uses `gulp` to automate many processes in the development environment.

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
