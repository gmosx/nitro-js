Google App Engine
=================

Nitro is compatible with Google App Engine. The Narwhal [appengine](http://github.com/gmosx/appengine) package is a component of the Ecosystem.

For an example Nitro application that runs on AppEngine and leverages AppEngine services like the DataStore, download and study the [blog-gae](http://github.com/gmosx/blog-gae) example.


Datastore
---------

The Python ext/db api is supported. The API is slightly different to better fit JavaScript.

    var db = require("google/appengine/ext/db");

    var Category = db.Model("Category", {
	    label: new db.StringProperty(),
	    category: new db.ReferenceProperty({referenceClass: Category})
    });

    var c = new Category({keyName: "news", label: News"});
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


Users
-----

    var users = require("google/appengine/api/users");
    
    var user = users.getCurrentUser();
    
    if (users.isCurrentUserAdmin()) {
        ...
    }
    
    var url = user.createLoginURL();


Task Queue
----------

    var taskqueue = require("google/appengine/api/labs/taskqueue");
    
    taskqueue.add({url: "/worker", method: "GET", params: {par1: "hello", par2: "world"}});  
    
    var task = new Task({url: "/worker", method: "GET", params: {par1: "hello", par2: "world"}});
    task.add("customqueue");


Example
-------

For an example of the usage of this library have a look at the [blog-gae](http://github.com/gmosx/blog-gae) example.


Component status
----------------

This library is under construction but usable. Substantial parts of the Python API are converted.

* google/appengine/api/memcache: 80% (usable)
* google/appengine/api/urlfetch: 80% (usable)
* google/appengine/api/mail: 60% (usable)
* google/appengine/api/images: 40% (usable)
* google/appengine/api/users: 80% (usable)
* google/appengine/api/labs/taskqueue: 80% (usable)
* google/appengine/ext/db: 80% (usable, expect minor API changes)
* google/appengine/ext/db/forms: 30% (expect API changes)



Google App Engine
-----------------

This is a community project, not affiliated in any way with Google.

Google App Engine is a service of Google, Inc. Copyright (c) 2009 Google, all rights reserved.

