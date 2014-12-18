define(function() {
  return [<% _.each(specs, function(spec) { %>
            '<%= spec %>',<% }); %>
      ];
});
