'use strict';
var fs = require('fs');

module.exports = {
  getListFolder: function (path) {
    try {
      var files = fs.readdirSync(path).map(function (file) {
            return file.slice(0, -3);
          }
        );
      return files;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
};

