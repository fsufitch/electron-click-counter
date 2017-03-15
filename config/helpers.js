/**
 * @author: @AngularClass
 */
var path = require('path');
var fs = require('fs');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

var nodeModules = {};
var rootModules = fs.readdirSync('node_modules');
var ng2Modules = fs.readdirSync('node_modules/@angular')
  .map(mod => '@angular/' + mod);
rootModules.concat(ng2Modules)
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

exports.hasProcessFlag = hasProcessFlag;
exports.nodeModules = nodeModules;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
