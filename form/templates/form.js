define([
  'backbone.marionette',
],
function (<%= _.classify('marionette') %>){
    'use strict';

  /*
    The model should be passed when the object is instantiated.
    For example:

    new NodeContactForm({
      // Don't send model parameters for new items
      model: new Backbone.Drupal.Models.<%= _.classify(model) %>({nid:1})
    });
   */

  var <%= _.classify(name) %>Form = Backform.Form.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(name) %> Form");
      this.model = new Backbone.Drupal.Models.<%= _.classify(model) %>();
      Backform.Form.prototype.initialize.apply(this, arguments);
    },
    fields: [<% _.each(fields, function (field) { %>
      {name: "<%= field.id %>", label: "<%= _.classify(field.id) %>", control: "<%= _.classify(field.type) %>"},<% }); %>
      // Add submit button
      {name: 'Submit', id: 'submit', control: 'button', label: 'Submit'}
    ],
    events: {
          'submit': 'saveForm',
    },
    saveForm: function (ev) {
      this.model.save(null, {
        success: function (response) {
          router.navigate('', {trigger:true});
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
