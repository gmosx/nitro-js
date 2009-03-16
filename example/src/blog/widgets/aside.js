var Category = require("blog/category").Category;

exports.Aside = function(request, response) {
    response.setData({
        asideCategories: $db.query("SELECT id, label, term FROM Category ORDER BY label").all(Category)
    });
}
