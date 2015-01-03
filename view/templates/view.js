define([
  'backbone.marionette'<% if (!_.isEmpty(ViewModel)) { %>,
  'model/<%= ViewModel %>'<% } %><% if (!_.isEmpty(ViewCollection)) { %>,
  'collection/<%= ViewCollection %>'<% } %><% if (!_.isEmpty(templateName)) { %>,
  'twig',
  'text!template/<%= templateName %>.html.twig'<% } %>
],
function(<%= _.classify('marionette') %><% if (!_.isEmpty(ViewModel)) { %>, <%= _.classify(ViewModel) %>Model<% } %><% if (!_.isEmpty(ViewCollection)) { %>, <%= _.classify(ViewCollection) %>Collection<% } %><% if (!_.isEmpty(templateName)) { %>, Twig, <%= _.classify(templateName)%>Template<% } %>){
    'use strict';
  /*<% if (!_.isEmpty(ViewModel)) { %>
    The model should be passed when the view is instantiated in action.
    For instance copy inside the action:

    // New model
    //var <%= _.classify(View) %>  = new <%= _.classify(View) %>View({
      // // Don't send model parameters for new items
      //model: new <%= _.classify(ViewModel) %>Model()
    //});

    //Edit / Fetch model to render in a specific region. You must change the ID
    var viewModel = new <%= _.classify(ViewModel) %>Model({nid:1})

    viewModel.fetch({
      success: function (Model) {
        var <%= _.underscored(View) %> = new <%= _.classify(View) %>View({model: Model});
        region.show(<%= _.underscored(View) %>);
      }
    });

    <% } %>
    <% if (!_.isEmpty(ViewCollection)) { %>
    var <%= _.underscored(ViewCollection) %>  = new <%= _.classify(ViewCollection) %>Collection({});

    // Load Collection
    <%= _.underscored(ViewCollection) %>.fetch({
      success: function (Collection) {
        var <%= _.underscored(View) %> = new <%= _.classify(View) %>View({collection: Collection});
        region.show(<%= _.underscored(View) %>);
      }
    });
    <% } %>
   */

  var <%= _.classify(View) %>View = Marionette.ItemView.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(View) %> View");
    },
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
    },*/
    template: function(data) {
      var template = Twig.twig({
          data: <%= _.classify(View) %>Template
      });
      return template.render(data);
    }
  });

  return <%= _.classify(View) %>View;

});
