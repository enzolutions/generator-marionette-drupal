define(['!collection/<%= Collection %>'], function(<%= _.classify(Collection) %>) {
  describe("<%= _.classify(Collection) %> Collection", function() {
    it("should have a model object", function() {
      console.log('testing <%= _.classify(Collection) %>Collection');
      var <%= _.classify(Collection) %>Collection = new <%= _.classify(Collection) %>();
      expect(<%= _.classify(Collection) %>Collection.get('model')).not.toBe(null);;
    });
  });
});
