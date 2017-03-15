Electron Click Counter
======================

I got bored and decided to figure out how this whole "using HTML/JS to build a desktop application" thing worked. Three attempts later, you are looking at the result. Notable points:

* Uses [Electron](https://electron.atom.io) as the framework to run on desktop.
* Dependencies and scripts are managed using NPM.
* Code is written using [Typescript](https://typescriptlang.org).
* Build process / linking is handled by [Webpack](https://webpack.js.org/).
* The actual interactive "window" is built using [Angular 2](https://angular.io).
* General logic in both the main app and in the Angular 2 window are done using [rxjs](https://github.com/Reactive-Extensions/RxJS).

All this for some fairly simple features: a counter that increases when you push a button, and program state being "saved" and accessible via a status "tray" icon.

Check the code out
------------------

**Requirements:**

* node 6.7.0+
* npm 3.10.3+

**Setup:**

    $ git clone https://github.com/fsufitch/electron-click-counter.git
    $ cd electron-click-counter
    $ npm install

**Development commands:**

| Command | Description |
| ---: | ---- |
| `npm run build` | One-time build project JS to `bundles/` |
| `npm run build:watch` | Build project JS to `bundles/`, watch sources for changes and update as necessary |
| `npm start` | One-time build project, run the result using Electron |
| `node_modules/.bin/electron .` | Run current built artifacts without building |
| `npm run package` | Use `electron-packager` to build binary distributables in `dist/` for your current platform |
| `npm run package:all` | As `npm run package`, except build for all possible/available platforms |
| `npm run distribute` | `npm run build` followed by `npm run package:all`

... Or just run it
------------------

You can find pre-built binaries for Linux x64 and Windows ia32 on the [releases page](https://github.com/fsufitch/electron-click-counter/releases/tag/1.0.0).
