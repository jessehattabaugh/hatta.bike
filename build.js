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

const SRC = 'src';
const DEST = 'public';
const ARGS = parseArgs(process.argv.slice(2));

const B = browserify(
  path.join(SRC, 'main.js'),
  ARGS.dev ? {
    cache: {},
    packageCache: {},
    plugin: [
      watchify,
      errorify
    ]
  } : {}
)
  .transform(babelify, {presets: ['es2015']})
  .transform(eslintify);

function bundle() {
  B.bundle()
    .pipe(fs.createWriteStream(path.join(DEST, 'index.js')));
}

/** clear old build products */
rm(path.join(__dirname, DEST), function () {
  mkdir(path.join(__dirname, DEST), function () {
    
    /** compile the index.html file */
    fs.writeFile(
      path.join(DEST, 'index.html'), 
      jade.renderFile(path.join(SRC, 'main.jade'), {
        cache: false,
        pretty: ARGS.dev
      })
    ); 
    
    /** bundle the index.js file */
    bundle();
    if(ARGS.dev) B.on('update', bundle);
      
  })
});



