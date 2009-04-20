var File = require("file").File,
    Template = require("text/template").Template;

var str = File.read("template.html").toString();

var tmpl = new Template(str);

var data = { 
    "name": "George",
    "category": {
        "label": "Life",
        "articles": [
            {"title": "Hello world<nice>"},
            {"title": "Bye world"},
            {"title": "It works"}
        ]
    }
}

print(tmpl.render(data));
