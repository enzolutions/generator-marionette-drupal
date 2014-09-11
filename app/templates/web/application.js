define([
	'backbone.marionette',
  'router',
	'communicator',
],

function (Marionette, Router, Communicator) {
  'use strict';

	var App = new Marionette.Application();

  /* Add application regions here */
  App.addRegions({
    mainMenuRegion: '#main-menu-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region'
  });

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

	/* Add initializers here */
	App.addInitializer(function () {
    // Start routing system
    Backbone.history.start();

		// Using the render result because we don't have region yet to render
		//document.body.innerHTML = mainView.render().el.innerHTML;
		Communicator.mediator.trigger('APP:START');
	});

  console.log("I'm in my app that I think is going to loop");
	return App;
});
