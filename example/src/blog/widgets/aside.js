var Category = require("blog/category").Category;

exports.Aside = function(request, response) {
    response.setData({
        asideCategories: $db.query("SELECT id, title FROM Category ORDER BY title").all(Category)
    });
}
