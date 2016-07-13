'use strict';

const browserify = require('browserify');
const path = require('path');
const fs = require('fs');
const rm = require('rimraf');
const mkdir = require('mkdirp');
const jade = require('pug');
const parseArgs = require('minimist');
const watchify = require('watchify');
const errorify = require('errorify');
const eslintify = require('eslintify');
const babelify = require('babelify');
const minifyify = require('minifyify');

const SRC = 'src';
const DEST = 'public';
const ARGS = parseArgs(process.argv.slice(2));

const config = {
  debug: true
};

if (ARGS.watch) {
  config.cache = {};
  config.packageCache = {};
  config.plugin = [watchify, errorify];
}

const bundler = browserify(path.join(SRC, 'main.js'), config)
  .plugin(minifyify, {
    map: 'index.js.map',
    output: path.join(DEST, 'index.js.map')
  })
  .transform(babelify, {
    presets: ['es2015']
  })
  .transform(eslintify);

/** clear old build products */
rm(path.join(__dirname, DEST), function() {
  mkdir(path.join(__dirname, DEST), function() {

    /** compile the index.html file */
    fs.writeFile(
      path.join(DEST, 'index.html'),
      jade.renderFile(path.join(SRC, 'main.jade'), {
        cache: false,
        pretty: false
      })
    );

    /** bundle the index.js file */
    bundle();

    /** rebundle if source changes */
    if (ARGS.watch) bundler.on('update', bundle);
    
    function bundle() {
      bundler.bundle()
        .pipe(fs.createWriteStream(path.join(DEST, 'index.js')));
    }

  })
});
