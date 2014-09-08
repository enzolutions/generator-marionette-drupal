define(
  ['backbone.marionette',
  ],
    function (Marionette) {
        'use strict';

        var <%= _.classify(name) %> = function <%= _.classify(name) %>() {
           // statements go here
           console.log("initialize a <%= _.classify(name) %> Action");
        };

        return <%= _.classify(name) %>;
      });
