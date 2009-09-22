Object Oriented Programming
===========================

JavaScript supports object oriented programming through the Prototype pattern. To promote uniformity accross Nitro applications and middleware we promote the use of a couple of programming idioms.


Object Extension (Inheritance)
------------------------------

The standard Object.create mechanism is used as demonstrated in the following example:

    var Content = function(title, body) {
    }

    Content.prototype.summary = function() {
        return this.body.splice(0, 10);
    }    
    
    var Article = function(title, body) {
        Content.call(this, title, body);
    }
    
    // Article inherits from Content.
    Article.prototype = Object.create(Content.prototype);
    
    var article = new Article("Hello", "Hello world");
    

Object Inclusion (Mixins)
-------------------------

It is obvious from the above example that only Single Inheritance is supported. To mitigate this shortcomming we can use Object Inclusion, ie Mixins. The concept will be demonstrated with an example:

    var update = require("hash").Hash.update;
    
    var Taggable = function(base) {
        update(base.prototype, Taggable.prototype);
    }
    
    Taggable.prototype.tags = function() {
        return this.tagString.split(",");
    }
    
    // Include Taggable functionality in Article.
    Taggable.extend(Article);
    
    var article = new Article("Hello", "Hello world");
    article.tagString = "news,local";
    
    print(article.tags());
    
