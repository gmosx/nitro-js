

var Article = exports.Article = Object.define(function(title, content) {
});

Article.extend(Content);
Article.include(Timestamped, Validation);

