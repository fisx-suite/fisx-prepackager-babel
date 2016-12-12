fisx-prepackager-babel
======
[![Dependency Status](https://david-dm.org/wuhy/fisx-prepackager-babel.svg)](https://david-dm.org/wuhy/fisx-prepackager-babel) [![devDependency Status](https://david-dm.org/wuhy/fisx-prepackager-babel/dev-status.svg)](https://david-dm.org/wuhy/fisx-prepackager-babel#info=devDependencies) [![NPM Version](https://img.shields.io/npm/v/fisx-prepackager-babel.svg?style=flat)](https://npmjs.org/package/fisx-prepackager-babel)

> A prepackager for fisx to extract the used babel helper api code to a file when using babel-plugin-external-helpers plugin. 

## How to use

### Install

```shell
npm install fisx-prepackager-babel --save-dev
```

### Add configure to fis-conf.js

```js
// specify the used babel
fis.require('prepackager-babel').babel = require('babel-core');
fis.match('::package', {
    prepackager: fis.plugin('babel')
});
```

Add the `babelHelpers` module variable declaration in compiled babel file, use [fisx-preprocessor-babel](https://github.com/wuhy/fisx-preprocessor-babel) plugin.

### Options

* babelHelperFileName - `string` `optional`: define the output babel helper file name, by default `src/babelHelpers.js`

* babelHelperFileOption - `Object` `optional`: specify the output babel helper fis file option, the detail options refer fis `File` class

