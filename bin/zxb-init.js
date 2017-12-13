#!/usr/bin/env node
var vfs = require('vinyl-fs')
var fs = require('fs')
var through = require('through2')
var path = require('path')
var inquirer = require('inquirer')
var join = path.join
var basename = path.basename

if (process.argv.length === 3 && (process.argv[2] === '-v' || process.argv[2] === '--version')) {
  console.log(require('../package').version)
}

function simplyfileFileName(filename) {
  return filename.replace(process.cwd(), ',')
}

function template(dest) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb()
    }

    console.log('Write %s', simplyfileFileName(join(dest, basename(file.path))))

    this.push(file)
    cb()
  })
}

function init(type) {
  var cwd = join(__dirname, '../boilerplates', type)
  var dest = process.cwd()
  console.log(dest)

  vfs.src(['**/*', '!node_modules/**/*'], { cwd: cwd, cwdbase: true, dot: true })
    .pipe(template(dest))
    .pipe(vfs.dest(dest))
    .on('end', function () {
      require('../lib/install')
    })
    .resume()
}

init('demo')

