'use strict';

const browserify = require('browserify');
const path = require('path');
const fs = require('fs');
const rm = require('rimraf');
const mkdir = require('mkdirp');
const jade = require('pug');

const FB = require('./firebase.json');
const SRC = 'src';
const DEST = FB.hosting.public;

/** clear old build products */
rm(path.join(__dirname, DEST), function () {
  mkdir(path.join(__dirname, DEST), function () {
    
    /** compile the index.html file */
    fs.writeFile(
      path.join(DEST, 'index.html'), 
      jade.renderFile(path.join(SRC, 'main.jade'), {})
    ); 
    
    /** bundle the index.js file */
    browserify()
      .add(path.join(SRC, 'main.js'))
      .bundle()
      .pipe(fs.createWriteStream(path.join(DEST, 'index.js')));
      
  })
});

