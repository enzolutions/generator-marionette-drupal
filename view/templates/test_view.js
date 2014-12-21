define(['!view/<%= View %>'], function(<%= _.classify(View) %>) {

  var <%= _.classify(View) %>View = new <%= _.classify(View) %>();

  describe("<%= _.classify(View) %> View", function() {
    it("can test for default events like a ul click", function() {
    console.log('testing <%= _.classify(View) %>View Events');
     expect(<%= _.classify(View) %>View.events['click ul li']).toBeDefined();
     expect(<%= _.classify(View) %>View.events['click ul li']).toEqual('clickCallback');
    });
  });

  describe("<%= _.classify(View) %> View", function() {
    it("should have a model object", function() {
      console.log('testing <%= _.classify(View) %>View Model');
      expect(<%= _.classify(View) %>View.model).not.toBe(null);;
    });
  });
});
