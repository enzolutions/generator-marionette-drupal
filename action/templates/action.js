define(
  ['backbone.marionette',<% if (!_.isEmpty(Action.Model)) { %>
  'model/<%= Action.Model %>',<% } %><% if (!_.isEmpty(Action.Collection)) { %>
  'collection/<%= Action.Collection %>',<% } %><% if (!_.isEmpty(Action.View)) { %>
  '!view/<%= Action.View %>'],<% } %><% if (!_.isEmpty(Action.Form)) { %>
  '!form/<%= Action.Form %>'],<% } %>
  function (Marionette ,<% if (!_.isEmpty(Action.Model)) { %> <%= _.classify(Action.Model) %>Model,<% } %><% if (!_.isEmpty(Action.Collection)) { %><%= _.classify(Action.Collection) %>Collection,<% } %><% if (!_.isEmpty(Action.View)) { %><%= _.classify(Action.View) %>View<% } %><% if (!_.isEmpty(Action.Form)) { %><%= _.classify(Action.Form) %>Form<% } %>) {
    'use strict';

    var <%= _.classify(Action.Action) %> = function (App) {
      // Get region to render
      var region = App._regionManager.getRegion('<%= Action.Region %>');

      // statements go here
      console.log("initialize a <%= _.classify(Action.Action) %> Action");

      <% if (_.isEmpty(Action.Model) && _.isEmpty(Action.Collection)) { %>
        <% if (!_.isEmpty(Action.View)) { %>
        var <%= _.underscored(Action.View) %> = new <%= _.classify(Action.View) %>View({model: null});
        region.show(<%= _.underscored(Action.View) %>);
        <% } %>
        <% if (!_.isEmpty(Action.Form)) { %>
        var <%= _.underscored(Action.Form) %> = new <%= _.classify(Action.Form) %>Form({model: null});
        region.show(<%= _.underscored(Action.Form) %>);
        <% } %>
      <% } %>

      <% if (!_.isEmpty(Action.Model)) { %>
      //The model should be passed when is instantiated in action.

      // New model
      <% if (!_.isEmpty(Action.View)) { %>
      /*var <%= _.classify(Action.View) %>  = new <%= _.classify(Action.View) %>View({
      <% } %>
      <% if (!_.isEmpty(Action.Form)) { %>
      /*var <%= _.classify(Action.Form) %>  = new <%= _.classify(Action.Form) %>Form({
      <% } %>
        // Don't send model parameters for new items
        model: new <%= _.classify(Action.Model) %>Model()
      });*/

      //Edit / Fetch model to render in a specific region. You must change the ID
      var viewModel = new <%= _.classify(Action.Model) %>Model({nid:1<% if (!_.isEmpty(Action.Form)) { %>, backform: true<% } %>});

      viewModel.fetch({
        success: function (Model) {
          <% if (!_.isEmpty(Action.View)) { %>
          var <%= _.underscored(Action.View) %> = new <%= _.classify(Action.View) %>View({model: Model});
          region.show(<%= _.underscored(Action.View) %>);
          <% } %>
          <% if (!_.isEmpty(Action.Form)) { %>
          var <%= _.underscored(Action.Form) %> = new <%= _.classify(Action.Form) %>Form({model: Model});
          region.show(<%= _.underscored(Action.Form) %>);
          <% } %>
        }
      });

      <% } %>

      <% if (!_.isEmpty(Action.Collection)) { %>
      var <%= _.underscored(Action.Collection) %>  = new <%= _.classify(Action.Collection) %>Collection({});

      // Load Collection
      <%= _.underscored(Action.Collection) %>.fetch({
        success: function (Collection) {
          var <%= _.underscored(Action.View) %> = new <%= _.classify(Action.View) %>View({collection: Collection});
          region.show(<%= _.underscored(Action.View) %>);
        }
      });
      <% } %>

    };

    return <%= _.classify(Action.Action) %>;
  });
