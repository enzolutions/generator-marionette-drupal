define([
  'backbone.marionette'<% if (!_.isEmpty(ViewModel)) { %>,
  'model/<%= ViewModel %>'<% } %><% if (!_.isEmpty(ViewCollection)) { %>,
  'collection/<%= ViewCollection %>'<% } %><% if (!_.isEmpty(templateName)) { %>,
  'twig',
  'text!template/<%= templateName %>.html.twig'<% } %>
],
function(<%= _.classify('marionette') %><% if (!_.isEmpty(ViewModel)) { %>, <%= _.classify(ViewModel) %>Model<% } %><% if (!_.isEmpty(ViewCollection)) { %>, <%= _.classify(ViewCollection) %>Collection<% } %><% if (!_.isEmpty(templateName)) { %>, Twig, <%= _.classify(templateName)%>_Template<% } %>){
    'use strict';

  <% if (!_.isEmpty(ViewModel)) { %>
    // Pass to Model constructor the proper id to fetch infomation like {uid: 1}
    var <%= _.underscored(ViewModel) %>Model  = new <%= _.classify(ViewModel) %>Model({});
  <% } %>

  <% if (!_.isEmpty(ViewCollection)) { %>
    // Pass to Collection constructor the proper collection endpoint to fetch infomation like {name: 'users'}
    var <%= _.underscored(ViewCollection) %>Collection  = new <%= _.classify(ViewCollection) %>Collection({});
  <% } %>

  var <%= _.classify(View) %>View = Marionette.ItemView.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(View) %> View");
    }
    // Organizing UI more info: http://marionettejs.com/docs/marionette.itemview.html#organizing-ui-elements
    /*ui: {
      paragraph: 'p',
      button: '.my-button'
    },*/
    // Register event in view using UI
    /*events: {
      'click @ui.button': 'clickedButton'
    },*/
    // Sample of event reaction function.
    /*clickedButton: function() {
      console.log('I clicked the button!');
    }*/<% if (!_.isEmpty(templateName)) { %>,
    template: function(data) {
      var template = Twig.twig({
          data: <%= _.classify(View) %>_Template
      });
      return template.render(data);
    },<% if (!_.isEmpty(ViewModel)) { %>
    model: <%= _.underscored(ViewModel)%>Model<% } %>
    <% if (!_.isEmpty(ViewCollection)) { %>
    collection: <%= _.underscored(ViewCollection)%>Collection<% } %>

    <% } %>
  });

  return <%= _.classify(View) %>View;

});
