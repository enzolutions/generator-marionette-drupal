define(function (){
    return {
        init: function(RegionManager){
        <% _.each(regions, function (region) { %>
          RegionManager.addRegion('<%= region.name %>','<%= region.id %>');
        <% }); %>
        }
    };
});
