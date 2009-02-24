
exports.app = function(request, response) {
    if (request.isPost()) {
        var params = request.params();
        print("----------- " + params.msg);
    }

    response.redirect(request.referer());
}
