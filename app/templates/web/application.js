define([
  'backbone.marionette',
  'router',
  'routes',
  'communicator',
  'regionManager',
  'regions',
],

function (Marionette, Router, Routes, Communicator, RegionManager, Regions) {
  'use strict';

  // Enable Backform support for Bootstrap 2.3
  Backform.bootstrap2();

	var App = new Marionette.Application();

  // Set Backend API Information
  Backbone.Drupal.restEndpoint = {
    root: '<%= backendServer %>:<%= backendPort %>' <% if (backendVersion) { %>,
    version: 8
    <% } else { %>
    version: 7,
    dataType: '.json'
    <% } %>
  };

  <% if (backendCORS === true) { %>
  // Define auth object, set crossDomain if is necessary
  var Auth = new Backbone.Drupal.Auth({crossDomain: true <% if (backendVersion === false) { %>, drupal8: false <% } %>});
  <% } %>
  // Request executed in sync mode
  // If status is token further ajax will use the proper token
  var auth_status = Auth.login('<%= backendUser %>', '<%= backendPassword %>');

  if(auth_status) {
    // Do something if login works
    console.log('Auth Works');
  }
  else {
    // Do something if login fails
    console.log('Auth Error');
  }

	/* Add initializers here */
	App.addInitializer(function () {

    this._regionManager = new RegionManager();

    Regions.init(this._regionManager);

    /* Add application regions here */
    /*this._regionManager.addRegion('mainMenuRegion', '#main-menu-region');
    this._regionManager.addRegion('contentRegion', '#content-region');
    this._regionManager.addRegion('footerRegion', '#footer-region');
*/
    // Initialize Router
    this._router = new Router({ App: this});

    // Set routes in router
    Routes.init(this._router);
    // Start routing system
    Backbone.history.start();

		Communicator.mediator.trigger('APP:START');
	});

	return App;
});
