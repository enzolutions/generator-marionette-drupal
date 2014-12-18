define(['!model/<%= Model %>'], function(<%= _.classify(Model) %>) {
  describe("<%= _.classify(Model) %> Model", function() {
    it("should have a default empty string title", function() {
      console.log('testing <%= _.classify(Model) %>Model');
      var <%= _.classify(Model) %>Model = new <%= _.classify(Model) %>();
      expect(<%= _.classify(Model) %>Model.get('title')).toBe('');
    });
  });
});
