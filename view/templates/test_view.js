define(['!view/<%= View %>'], function(<%= _.classify(View) %>) {
  describe("<%= _.classify(View) %> View", function() {
    it("can test for default events like a ul click", function() {
    console.log('testing <%= _.classify(View) %>View');
     expect(macysView.events['click ul li']).toBeDefined();
     expect(macysView.events['click ul li']).toEqual('clickCallback');
    });
  });
});
