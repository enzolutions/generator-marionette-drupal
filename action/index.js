'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');

module.exports = ActionGenerator;

function ActionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.askFor = function () {
  var done = this.async();

  this.actionsDirectory = this.config.get('actionsDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');
  this.regions = this.config.get('regions');

  this.regionsName = [];

  this.regions.forEach(function (region) {
    this.regionsName.push(region.name);
  }.bind(this));

  this.actions =  this.config.get('actions');

  var viewsDir = validDir.getValidatedFolder(this.viewsDirectory);

  var views = listDir.getListFolder(viewsDir);

  this.conflictAction = null;
  this.Action = null;

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
      name: 'actionViews',
      message: 'Choose what view must be included?',
      choices: views
    },
    {
      type: 'checkbox',
      name: 'actionRegions',
      message: 'Choose what region must be included to render View?',
      choices: this.regionsName
    },
  ];

  this.prompt(prompts, function (props) {

    this.actions.forEach(function (action) {
      if (action.route === props.actionRoute || action.action === props.actionName) {
        this.conflictAction = action;
        return true;
      }
    }.bind(this));

    if (this.conflictAction) {
      console.log('Your request cannot be process because has conflicts with the following action');
      console.log('Action: ', this.conflictRegion);
    }
    else {
      this.appDirectory = this.config.get('appDirectory');
      this.Action = {route: props.actionRoute, action: props.actionName, 'regions': props.actionRegions, 'views': props.actionViews};
      this.actions.push(this.Action);
      this.config.set('actions', this.actions);
      console.log('Action was added sucessfully');
    }

    done();
  }.bind(this));
};

ActionGenerator.prototype.generateActions = function () {
  if (!this.conflictAction) {

    this.actionsDirectory = this.config.get('actionsDirectory');

    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;

    var ext = "js";
    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;
    this.regions =  this.config.get('regions');
    console.log(this.Action);
    this.template('action.js', this.actionsDirectory + '/' + this.Action.action + '.' + ext);

    // Generate controller for application
    this.routes = this.config.get('actions');
    this.template('../../app/templates/web/controller.js', this.appDirectory + '/scripts/controller.js');

    // Generate routes for application
    this.template('../../app/templates/web/routes.js', this.appDirectory + '/scripts/routes.js');

  }
};
