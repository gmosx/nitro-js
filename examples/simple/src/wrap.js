// An example wrap middleware.

exports.Wrap = function(app) {
    return function(env) {
        print("Responding to " + env["PATH_INFO"]);
    	return app(env);
    }
}
