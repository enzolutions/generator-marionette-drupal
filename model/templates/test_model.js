define(['!model/<%= name %>'], function(<%= _.classify(name) %>) {
  describe("<%= _.classify(name) %> Model", function() {
    it("should have a default empty string title", function() {
      console.log('testing <%= _.classify(name) %>Model');
      var <%= _.classify(name) %>Model = new <%= _.classify(name) %>();
      expect(<%= _.classify(name) %>Model.get('title')).toBe('');
    });
  });
});
