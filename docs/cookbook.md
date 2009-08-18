Cookbook
========

A collection of random (yet useful) code snippets.

Menu
----

Using the simple yet powerful Templating system, you can easily create menus:

Code:

    var categories = [];    
    for (var i in categoriesMap)
        selected == i ? categories.push({name: i, selected: true}) : categories.push({name: i});
    return render({categories: categories});

Template:

    <ul>
    {.with categories}
        {.if selected}
        <li class="selected">{name}</li>
        {.else}
        <li><a href="/category?id={name}">{name}</a></li>
        {.end}
    {.end}
    </ul>
