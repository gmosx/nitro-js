Google App Engine
=================

Nitro is compatible with Google App Engine. The Narwhal [appengine](http://github.com/gmosx/appengine) package is a component of the Ecosystem.

For an example Nitro application that runs on AppEngine and leverages AppEngine services like the DataStore, download and study the [blog-gae](http://github.com/gmosx/blog-gae) example.


Datastore
---------

The Python ext/db api is supported. The API is slightly different to better fit JavaScript.

    var db = require("google/appengine/ext/db");

    var Category = function(term, label, category) {
	    this.term = term;
	    this.label = label;
	    this.category = category;
	    this.__key__ = db.key({kind: this.constructor.kind(), name: term});
    }

    db.Model.extend(Category, "Category", {
	    term: new db.StringProperty(),
	    label: new db.StringProperty(),
	    category: new db.ReferenceProperty({referenceClass: Category})
    });

    var c = new Category("news", News");
    c.put();
    var key = ...
    var c1 = Category.get(key);
    var c2 = Category.getByKeyName("news");
    var categories = Category.all().limit(3).fetch();


Images
------

    var images = require("google/appengine/api/images");
    var i = images.resize(params.image.data, 640, 480);


Email
-----

    var EmailMessage = require("google/appengine/api/mail").EmailMessage;

    new EmailMessage({
        sender: "george.moschovitis@gmail.com",
        to: "receiver@site.com",
        subject: "My email",
        body: template.render(params)
    }).send();


Memcache
--------

    var memcache = require("google/appengine/api/memcache");
    
    var fragment = memcache.get("fragment");
    if (!fragment) {
        ...
        memcache.set("fragment", fragment);
    }
