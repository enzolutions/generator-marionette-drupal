define([
	'backbone.marionette',
	'communicator',
	'../views/main',
	'../models/empty'
],

function (Marionette, Communicator, MainView, EmptyModel) {
  'use strict';

  var emptyModel = new EmptyModel();

  // Set a custom data in model to show in template
  emptyModel.set('success', 'Congrats Yeoman for Marionette + Drupal is Working');


	var mainView = new MainView({model: emptyModel});

	var App = new Marionette.Application();

  // Set Backend API Information
  Backbone.Drupal.restEndpoint = {
    root: 'http://<%= backendServer %>:<%= backendPort %>' <% if (backendVersion === false) { %>,
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
	/* Add application regions here */
	App.addRegions({});

	/* Add initializers here */
	App.addInitializer(function () {
		// Using the render result because we don't have region yet to render
		document.body.innerHTML = mainView.render().el.innerHTML;
		Communicator.mediator.trigger('APP:START');
	});

	return App;
});
