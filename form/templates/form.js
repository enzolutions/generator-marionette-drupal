define([
  'backbone.marionette',
],
function (<%= _.classify('marionette') %>){
    'use strict';

  /*
    The model should be passed when the form is instantiated in action.
     For instance copy inside the action:

    // New model
    new <%= _.classify(name) %>Form({
      // Don't send model parameters for new items
      model: new Backbone.Drupal.Models.<%= _.classify(model) %>({nid:1})
    });

    //Edit / Fetch model
    var viewModel = new Backbone.Drupal.Models.<%= _.classify(model) %>({nid:1})

    viewModel.fetch({
      success: function (model) {
        var <%= _.underscored(name) %>Form = new <%= _.classify(name) %>Form({model: viewModel});
        region.show(<%= _.underscored(name) %>Form);
      }
    });
   */

  var <%= _.classify(name) %>Form = Backform.Form.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(name) %> Form");
      Backform.Form.prototype.initialize.apply(this, arguments);
    },
    fields: [{name: 'title', label: 'Title', control: 'textarea'},<% _.each(fields, function (field) { %>
      {name: "<%= field.id %>", label: "<%= field.label %>", control: "<%= _.classify(field.type) %>", options: <%= field.options %>},<% }); %>
      // Add submit button
      {name: 'Submit', id: 'submit', control: 'button'}
    ],
    events: {
          'submit': 'saveForm',
    },
    saveForm: function (ev) {
      this.model.save(null, {
        success: function (response) {
          $("#messages").html('<div class="section clearfix"><div class="messages">' + response.statusText + '</div></div>');
        },
        error: function (user, response) {
          // Set the erros in Messages region
          $("#messages").html('<div class="section clearfix"><div class="messages error">' + response.statusText + '</div></div>');
        },
      });
      return false;
    }
  });

  return <%= _.classify(name) %>Form;

});
