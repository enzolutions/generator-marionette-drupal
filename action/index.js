'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var _ = require('underscore');

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
      type: 'list',
      name: 'actionView',
      message: 'Choose what view must be included in new action?',
      choices: views
    },
    {
      type: 'list',
      name: 'actionRegion',
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
      console.log('Action: ', this.conflictAction);
      process.exit();
    }
    else {
      this.appDirectory = this.config.get('appDirectory');

      this.MVC = this.config.get('MVC');
      this.selectedMVC = _.findWhere(this.MVC, {view: props.actionView});

      this.Action = {'Route': props.actionRoute, 'Action': props.actionName, 'Region': props.actionRegion, 'View': props.actionView};

      this.Action.Model = this.selectedMVC.model;
      this.Action.Collection = this.selectedMVC.collection;

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

    var ext = 'js';
    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;
    this.regions =  this.config.get('regions');
    this.template('action.js', this.actionsDirectory + '/' + this.Action.Action + '.' + ext);

    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;

    // Generate controller for application
    this.routes = this.config.get('actions');
    this.template('../../app/templates/web/controller.js', this.appDirectory + '/scripts/controller.js');

    // Generate routes for application
    this.template('../../app/templates/web/routes.js', this.appDirectory + '/scripts/routes.js');

  }
};
