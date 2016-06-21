# hatta.bike
hatta.bike

## Development

`npm install && npm start`

## Build process

### HTML
The main.jade file is compiled to HTML and output as the index.html file. When running in --dev mode the html will be pretty printed. 

### JS

The main.js file is bundled with Browerify and transformed with Babelify. The ES2015 preset is used. The bundle will be output as index.js.

## Todo

* [ ] minify JS on prod
* [ ] 