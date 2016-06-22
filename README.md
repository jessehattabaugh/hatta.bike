# [hatta.bike](http://hatta.bike)

A website about me.

## Starting the dev server

`npm install && npm start`

Server will be hosted [localhost:8080](http://localhost:8080)

## Build script

* [x] Build directory is initialized by `rimraf` and `mkdirp`
* [x] JS is bundled by `browserify`
* [x] Syntax errors are reported by `errorify`
* [x] Lint is caught by `eslintify`
* [x] When `--watch` flag is passed `watchify` rebundles on changes
* [x] HTML is compiled from `pug` template
* [ ] CSS is compiled by `stylus`