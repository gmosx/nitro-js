Templates
=========

The basic templating mechanism is a clean implementation of [JSON Template](http://json-template.googlecode.com/svn/trunk/doc). A template string is combined with a JSON data dictionary to produce the final output.

Example usage
-------------

template.html:

    <html>
    <h1>Hello {name}</h1>

    {.section profile}
    <p>
        {age}<br/>
        {gender}<br/>
    </p>
    {.end}

    <p>Your age is {profile.age}</p>
        
    <ul>
    {.repeated section articles}
        <li>{title} - {count}</li>
    {.or}
        <li>No articles found</li>    
    {.end}
    </ul>
    
    {.section admin}
    You have admin rights
    {.or}
    You don't have admin rights
    {.end}
    </html>

template.js:

    var fs = require("file"),
        Template = require("template").Template;

    var data = {
        name: "George",
        profile: {
            age: 34,
            gender: "M"
        },
        articles: [
            { "Hello world", 34 },
            { "Another article", 23 },
            { "The final", 7 }
        ],
        admin: true
    }

    var src = fs.read("template.html").toString();
    var template = new Template(src);

    print(template.render(data));

output:

    <html>
    <h1>Hello George</h1>

    <p>
        34<br/>
        M<br/>
    </p>

    <p>Your age is 34</p>
        
    <ul>
        <li>Hello world - 34</li>
        <li>Another article - 23</li>
        <li>The final - 7</li>
    </ul>

    You have admin rights
    </html>


Dot-delimited references
------------------------

For extra convenience, dot-delimited references are supported for {.with} and interpolations:

    {.section user.profile}
        {age}
    {.end}

or

    {user.profile.age}


Formatters
----------

The templating engine supports the notion of formatters using the JSON-Template/Django syntax:

    Hello {name|html}
    This is {name|html|bold}

You can easily add custom fromatters:

    Template.formatters.custom = function(val) {
        return val.toString() + "-formatted";
    }

    Hello {name|custom}
    
Alternatively, you can add formatters per template:

    var t = new Template(src, {formatters: {
        "custom": function(val) {
        return val.toString() + "-formatted";
    }} 
    
The custom formatters are merged (and can even override) the default formatters.       


Additional features
-------------------

Nitro provides two effective enhancements over the basic Template:

1. A fragment inclusion mechanism
2. A template inheritance mechanism

These features are similar to [Django templates](http://docs.djangoproject.com/en/dev/topics/templates/) or [Rails layouts](http://guides.rubyonrails.org/layouts_and_rendering.html). Again, an example will help illustrate the concept.

The parent template...

    <html>
        <head>
            <title>{.meta-left}title{.meta-right}</title>
        </head>
        <body>
            <h1>{breadcrumbs}</h1>
            <section>
                {content}
            </section>
        </body>
    </html>

combined with the child template...

    {.extends "/layout.html"}

    {.block breadcrumbs}
        Home / hello
    {.end breadcrumbs}

    {.block content}
    <h2>The content</h2>
    <p>
        Hello world!
        {.include "fragment.inc.html"}
    </p>
    {.end content}

and a fragment template...

    <span>I am included</span>

produce the output....

    <html>
        <head>
            <title>{title}</title>
        </head>
        <body>
            <h1>Home / hello</h1>
            <section>
                <h2>The content</h2>
                <p>
                    Hello world!
                    <span>I am included</span>
                </p>
            </section>
        </body>
    </html>

Please notice:

1. {.meta-left}..{.meta-right} is used to produce {title} after the parent template evaluation. It will be interpolated at run time when the child template is evaluated.
2. {.block xxx}....{.end xxx} blocks define fragments that are passed as values to the parent template. A special value called 'yield' captures the whole of the template as a convenience.


Related articles
----------------

[Introducing JSON Template](http://json-template.googlecode.com/svn/trunk/doc/Introducing-JSON-Template.html)
[On Design Minimalism](http://json-template.googlecode.com/svn/trunk/doc/On-Design-Minimalism.html)

