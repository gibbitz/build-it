# Weather API Code Challenge

## OVERVIEW <a name="overview"></a>
This codebase was developed as part of an application process to display a 5 day weather forcast. This readme file outlines the filestructure, system configuration and build processes.

## Table of Contents
  * [Overview](#overview)
  * [Getting Started](#getting-started)
    - [Dependencies](#front-end-build-dependencies)
    - [Installation](#front-end-build-installation)
  * [Front-end Build Process](#front-end-build)
    - [Tasks](#front-end-build-tasks)
    - [Tests](#front-end-tests)
  * [File Organization](#file-organization)
  * [Application Flow](#application-flow)

## Getting Started <a name="getting-started"></a>
This project uses a task runner to build files, lint, test and run a development server. Full functionality and installation details can be found below.

### Dependencies <a name="front-end-build-dependencies"></a>

In addition to Node 7.10.0/npm 4.2.0, the following dependencies are required:

_**Ruby and the scss-lint gem**_ : Unfortunately there aren't good IDE compatable scss linters that are using node-sass for parsing at the time of this writing. Installation: First install [Ruby](). On windows this involves downloading the MSI/EXE for installation and following the wizard. On *nix systems this will involve installing via a package manager. Generally these package managers have up-to-date stable releases available (enough for this anyway).

  _macOS_ : be sure you have the [xCode command line tools](https://apple.stackexchange.com/questions/88535/how-to-download-the-command-line-tools-for-xcode-without-the-downloads-for-devel) and [Homebrew](http://docs.brew.sh/Installation.html) installed, then:
  `$ brew install ruby`

  _Debian/Ubuntu_ :
  `$ sudo apt-get install ruby`

  Once Ruby is installed and the PATH variable is updated (.profile re-sourced), run:
  `gem install scss-lint`

_*Mocha Cli*_ : This is a soft dependency that allows for executing individual tests with the `mocha` command. if the testing tasks below do not work on your system, try installing this node module globally:

  `npm i mocha-cli -g`

_*Gulp Cli*_ : This soft dependency allows exectuting gulp tasks not defined as scripts by package.json using the `gulp` command. This should not be required for server environments, but is a must-have for developers. Below a list of the tasks showing which have aliases will make this more apparent.

### Installation <a name="front-end-build-installation"></a>

Once dependencies are met, using npm, installation is simple:

  _all platforms_ :
  `$ npm i` or `npm install` (if you like to type or need the practice)

## FILE ORGANIZATION <a name="file-organization"></a>
The files for this project are broken out into two basic directories based on front-end build processes being largely based in *nix and backend logic being .NET (non-core -- Windows environment only). That said, the targets of front end production build processes will reside in the .NET directories or be proxied for development as outlined in the [frontend build](README_FRONTEND.md).

```
.(root folder)
  │
  ├─ src ( source files used to compilie build targets. Served in local development )
  │   │
  │   ├─ img
  │   │
  │   ├─ scss
  │   │   │
  │   │   ├─ partials (mixins, variables, placeholders etc.)
  │   │   │
  │   │   └─ components (view-specific styling)
  │   │
  │   └─ js
  │       │
  │       ├─ actions (redux action creators)
  │       │
  │       ├─ constants (JS application constants live here. segregation by concern is encouraged)
  │       │
  │       ├─ debug (dev build process wrapper lives here)
  │       │
  │       ├─ inc (vanilla JS functions used elsewhere live here -- keeps logic (of last resort) out of components)
  │       │
  │       ├─ middleware (Redux Middlewares for modifying actions before they go to the Reducers)
  │       │   │
  │       │   ├─ dataServicesMiddleware (makes API calls from dispatched actions and dispatches further actions on success)
  │       │   │
  │       │   └─ applicationCacheMiddleware ( Manages singleton datastore not connected to react )
  │       │
  │       ├─ reducers (Redux Reducers -- segregation, again, encouraged)
  │       │
  │       ├─ store (Redux store boilerplate)
  │       │
  │       └─ views ("Page" level react components and wrappers are loose here.)
  │           │
  │           └─ components (React reused UI components -- think building-blocks/widgets)
  │
  ├─ gulp-paths.json ( paths & config used by gulpfile )
  │
  ├─ gulpfile.js ( configuration for build scripts )
  │
  ├─ .babelrc ( configuration for babel es6/jsx transpilation )
  │
  ├─ .editorconfig ( configuration for code conformity across IDEs )
  │
  ├─ .eslintrc ( configuration for javascript linting )
  │
  ├─ .scss-lint.yml ( configuration for scss linting )
  │
  ├─ .gitignore ( standard git ignore by file patterns )
  │
  ├─ node_modules ( lib for javascript packages used in build and code ( .gitigmnored -- generated by `npm install` ) )
  │
  ├─ .tmp ( build product for development proxying --.gitignored )
  │
  ├─ dist ( build product for distribution --.gitignored)
  │
  └─ package.json

```

## FRONT END BUILD PROCESS <a name="front-end-build"></a>

The build process used here is gulp-based. The Process allows for typical React build (JSX, image and scss loaders, minification and source mapping) as well as spriting images and image minification. Wrapping this functionality is the ability to run a local server proxying the development server URL (`devServerURL`) defined in `gulp.paths.json`. This functionality is used here to prevent CORs issues where public servers may not provide open access to their APIs. Obviously this would not work in production (Dev server runs locally, without the proxy paths would need to be updated etc.)

### Tasks <a name="front-end-build-tasks"></a>

The taskrunner is configured to run a host of tasks. Some of these tasks expected to be run most frequently have defined scripts in package.json to allow running them without additional requirements (cough: gulp-cli -- see above). In these cases you'll see two commands in the following list. Commands that start with `npm` can be run without gulp-cli.

`gulp clean` Task to clean out `.tmp` and `dist` directories in the build process as a dependency of `gulp prebundle`

`gulp default` Task to build the debug build of the JS with sourcemaps mimic and react devtools. At the time of this writing this is an alias for `gulp js:default` due to dependency management with single js file bundling.

`gulp image-min:release` Task to minify included images to reduce filesize

`gulp js:default` Primary dependency of the `gulp default` task.

`gulp js:release` Builds the minified un-mapped tool-less js to the `dist` folder.

`gulp lint:js` Runs Javascript linting (eslint) on the source codebase and reports errors in style and syntax of code.

`gulp lint:scss` Runs scss-lint on the styles (`.scss` files) and reports errors in style and syntax of code.

`gulp prebundle` Copies dependency css files into the temp directory and renames them as SCSS modules to allow them to be included directly from .scss files using @import within the project.

`gulp release` or `npm run build` At the time of this writing this is an alias for `gulp js:default` due to dependency management with single js file bundling. Note that this task includes testing. If tests fail, deployment should abort.

`gulp server:release` Runs a node server (with browsersync) on localhost using the `gulp release` (minified, non-mapped) build, proxying the remote site defined in `gulp.paths.json` on a port defined in the gulpfile and reported in the output (localhost:3030 at time of writing). This task is provided to troubleshoot issues with production code. Build times will be longer and debugging will be greatly hampered by opaque uglified code.

`gulp server` or `npm run start` Runs a node server (with browsersync) on localhost using the `gulp default` (debug) build, proxying the remote site defined in `gulp.paths.json` on a port defined in the gulpfile and reported in the output (localhost:3000 at time of writing). Note this build includes [mimic](https://github.com/500tech/mimic) it can be used to mock the API returns and statuses within the browser (RTFM). Note: at the time of this writing, mimic is breaking IE/Edge if you need to dev on these browsers, remove the dependency in `debug/app.js` while developing. This task also runs linting and tests.

`gulp sprite` Builds image sprites to reduce http requests. Since this is a single file bundle this dependency is unneeded (ATM) but included due to easy inclusion from original source. Don't judge.

`gulp test` or `npm test` Manually run tests.

### Tests <a name="front-end-build-tests"></a>

<!--TODO: Place description of testing code structure and coverage details here. Go into code styling/boilerplate and provide example references.-->

## APPLICATION FLOW <a name="application-flow"></a>

This application leverages [Redux](http://redux.js.org/) to manage the [Flux application architecture](https://facebook.github.io/flux/docs/overview.html). Adhering to this pattern keeps Reducers pure (only managing action payloads delivered to state) and React components 'dumb' (by offshoring logic to middleware via mapped dispatchers). Custom middleware is used to manage business logic where access to `state`, and current `action` are both available to perform any needed calculations prior to delivery to the reducers.

```
                       +-------------------------+
                       |                         |
                       |       ACTIONS           v
                       |       PASSED     +-------------+
                       |                  |             |
                +------+-----+            | +---------+ |
                |            |            | |         | |
       +------> | ACTION     |            | +---------+ |
       |        | CREATORS   |            |             |  ACTIONS
       |        |            |            | +---------+ |  MODIFIED:
       |        +------------+            | |         | |  API calls made,
       |                                  | +---------+ |  calculations performed
       | FUNCTION                         |  MIDDLEWARE |  etc.
       | CALLS                            |             |
       |                                  +------+------+
+-------------+                                  |
+-------------+                                  |
|             |                                  |
|    JSX      |                                  |
|             |                                  v
|             |                           +-------------+
+-------------+                ACTIONS    |             |
                               COMMITTED  | +---------+ |
       ^                            +-------+         | |
       |              +---------+   |     | +---------+ |
       |              |         | <-+     |             | PURE FINAL
       |              |         |         | +---------+ | MODIFICATIONS
       +--------------+  STATE  | <---------+         | | (mostly passthough)
                      |         |         | +---------+ |
   MODIFIED STATE     |         |         |             |
   TRIGGERS REDRAW    +---------+         | REDUCERS    |
                                          |             |
                                          +-------------+

```

[react-router-redux](https://github.com/reactjs/react-router-redux) is also used to manage routing in the application by dispatch and tie the state to browser history for forward and back navigation.
