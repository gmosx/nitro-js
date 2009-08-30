Templates
=========

The basic templating mechanism is a clean implementation of [JSON Template](http://json-template.googlecode.com/svn/trunk/doc), with minor changes. A template string is combined with a JSON data dictionary to produce the final output. An example will help to illustrate the concept.

The template...

    <html>
        <h1>Hello {name}</h1>

        {.with profile}
        <p>
            {age}<br/>
            {gender}<br/>
        </p>
        {.end}

        <ul>
        {.with articles}
            <li>{title} - {count}</li>
        {.else}
            <li>No articles found</li>    
        {.end}
        </ul>
        
        {.if admin}
        You have admin rights
        {.else}
        You don't have admin rights
        {.end}
    </html>

combined with the data dictionary (JSON object)...

    data = {
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

produce the output...

    <html>
        <h1>Hello George</h1>

        <p>
            34<br/>
            M<br/>
        </p>

        <ul>
            <li>Hello world - 34</li>
            <li>Another article - 23</li>
            <li>The final - 7</li>
        </ul>

        You have admin rights
    </html> 

The template mechanism is available as a [standard CommonJS package](http://github.com/gmosx/template/tree/master).

Additional features
-------------------

Nitro provides two effective enhancements over the basic Template:

1. A fragment inclusion mechanism
2. A template inheritance mechanism

These features are similar to [Django templates](http://docs.djangoproject.com/en/dev/topics/templates/) or [Rails layouts](http://guides.rubyonrails.org/layouts_and_rendering.html). Again, an example will help illustrate the concept.

The parent template...

    <html>
        <head>
            <title>{{title}}</title>
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

1. {{title}} is unescaped to {title} after the Layout template evaluation (standard template behaviour). It will be interpolated at run time.
2. {.block xxx}....{.end xxx} blocks define fragments that are passed as values to the parent template. A special value called 'yield' captures the whole of the template as a convenience.


Related articles
----------------

[Introducing JSON Template](http://json-template.googlecode.com/svn/trunk/doc/Introducing-JSON-Template.html)
[On Design Minimalism](http://json-template.googlecode.com/svn/trunk/doc/On-Design-Minimalism.html)

