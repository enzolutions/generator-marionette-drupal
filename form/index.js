'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var requestSync = require('sync-request');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');

module.exports = ActionGenerator;

function ActionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.askFor = function () {
  var done = this.async();

  this.actionsDirectory = this.config.get('formsDirectory');
  this.backendServer = this.config.get('backendServer');
  this.backendAuthToken = this.config.get('backendAuthToken');
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
      type: 'list',
      name: 'entity',
      message: 'What entity you want to use to generate a form?',
      choices: [ 'Comment', 'Node' ],
      filter: function (val) { return val.toLowerCase(); }
    },
    {
      type: 'list',
      name: 'bundle',
      message: 'What entity bundle you want use to generate a form?',
      choices: function (response) {
        var values = [];
        var auth = 'Basic ' + this.backendAuthToken;
        var options = {
          headers: {
            'Authorization': auth,
            'Accept': 'application/json'
          }
        };

        var res;
        try {
          res = requestSync('GET', this.backendServer + '/bundles/' + response.entity, options);
          if (res.statusCode === 200) {
            var bundles = [];
            res = JSON.parse(res.body.toString());
            for (var index in res ) {
              bundles.push({value: index, name: res[index]});
            }
            return bundles;
          }
          else {
            this.log(yosay('Backend Server ' + this.backendServer + '/bundles/' + response.entity  + ' Error code: ' + res.statusCode));
            process.kill();
          }
        }
        catch (ex) {
          if (typeof(res) === 'undefined') {
            this.log(yosay('Backend Server is not available, execute: $ yo marionette-drupal:server to update information'));
          } else {
            this.log(yosay('Backend Server ' + this.backendServer  + ' Error code: ' + res.statusCode));
          }

          process.kill();
        }

        return values;
      }.bind(this),
      filter: function (val) { return val.toLowerCase(); }
    },
    {
      type: 'list',
      name: 'viewMode',
      message: 'What view mode you want use to generate a form?',
      choices: function (response) {
        var values = [];
        var auth = 'Basic ' + this.backendAuthToken;
        var options = {
          headers: {
            'Authorization': auth,
            'Accept': 'application/json'
          }
        };

        var res;
        try {
          res = requestSync('GET', this.backendServer + '/view_modes/' + response.entity + '/' + response.bundle, options);
          if (res.statusCode === 200) {
            var viewModes = [];
            res = JSON.parse(res.body.toString());
            for (var index in res ) {
              viewModes.push({value: index, name: res[index]});
            }
            return viewModes;
          }
          else {
            this.log(yosay('Backend Server ' + this.backendServer + '/view_modes/' + response.entity  + ' Error code: ' + res.statusCode));
            process.kill();
          }
        }
        catch (ex) {
          if (typeof(res) === 'undefined') {
            this.log(yosay('Backend Server is not available, execute: $ yo marionette-drupal:server to update information'));
          } else {
            this.log(yosay('Backend Server ' + this.backendServer  + ' Error code: ' + res.statusCode));
          }

          process.kill();
        }

        return values;
      }.bind(this),
      filter: function (val) { return val.toLowerCase(); }
    },
  ];

  this.prompt(prompts, function (props) {

    var auth = 'Basic ' + this.backendAuthToken;
    var options = {
      headers: {
        'Authorization': auth,
        'Accept': 'application/json'
      }
    };

    var res;
    try {
      res = requestSync('GET', this.backendServer + '/entity/entity_form_display/' + props.viewMode, options);
      var fields = [];
      var ignoreFields = ['uid', 'created', 'comment', 'path'];

      var inputTypes = {
        string_textfield: 'input',
        taxonomy_autocomplete: 'input',
        text_textarea_with_summary: 'textarea',
        boolean_checkbox: 'boolean',
        datetime_timestamp: 'datepicker',
        image_image: 'button',
        //'select', 'radio', 'spacer', 'button'
      };

      res = JSON.parse(res.body.toString());
      for (var field in res.content ) {
        if (ignoreFields.indexOf(field) < 0) {
          fields.push({id: field, type: inputTypes[res.content[field].type], settings: res.content[field]});
        }
      }
      this.model = props.entity;
      this.name = props.entity + '_' + props.bundle;
      this.fields = fields;
    }
    catch (ex) {
      console.log('Error code: ' + res.statusCode);
    }

    done();
  }.bind(this));
};

ActionGenerator.prototype.generateActions = function () {
  this.formsDirectory = this.config.get('formsDirectory');

  var ext = 'js';
  this.template('form.js', this.formsDirectory + '/' + this.name + '.' + ext);


  if (!this.conflictAction) {
    this.actionsDirectory = this.config.get('actionsDirectory');

    /*var ext = "js";
    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;
    this.regions =  this.config.get('regions');
    console.log(this.Action);
    this.template('action.js', this.actionsDirectory + '/' + this.Action.action + '.' + ext);

    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;

    // Generate controller for application
    this.routes = this.config.get('actions');
    this.template('../../app/templates/web/controller.js', this.appDirectory + '/scripts/controller.js');

    // Generate routes for application
    this.template('../../app/templates/web/routes.js', this.appDirectory + '/scripts/routes.js');
    */
  }
};
