'use strict';
var fs = require('fs');

module.exports = {
  getListFolder: function (path, length) {
    var extension_length = -3;
    if (length) {
      extension_length = length;
    }
    try {
      var files = fs.readdirSync(path).map(function (file) {
            return file.slice(0, extension_length);
          }
        );
      return files;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
};

