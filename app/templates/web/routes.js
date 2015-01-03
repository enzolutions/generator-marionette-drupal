define(function(){
    return {
        init: function(Router){
          <% _.each(routes, function(route) { %>
            Router.appRoute('<%= route.Route %>', '<%= route.Action %>');<% }); %>
        }
    };
});
