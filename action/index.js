'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var path       = require('path');

module.exports = ActionGenerator;

function ActionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.actionsDirectory = this.config.get('actionsDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');

  var actionsDir = validDir.getValidatedFolder(this.actionsDirectory);
  var viewsDir = validDir.getValidatedFolder(this.viewsDirectory);

  var views = listDir.getListFolder(viewsDir);

  var prompts = [
    {
      type: 'string',
      name: 'actionRoute',
      message: 'What is the route path for new action?',
    },
    {
      type: 'string',
      name: 'actionName',
      message: 'What is the name of function for new action?',
    },
    {
      type: 'checkbox',
      name: 'viewsList',
      message: 'Choose what view must be included?',
      choices: views
    },
  ];

  this.prompt(prompts, function (props) {
    console.log(props);

    var ext = 'js';


  }.bind(this));
  //this.tmpl = this.options['with-template'];
}

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.init = function () {
  this.actionsDirectory = this.config.get('actionsDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');
};
