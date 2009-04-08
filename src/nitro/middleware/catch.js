/**
 * Catches HTTP exceptions from upstream. 
 */
exports.Catch = function(app) {

    return function(env) {
        try {
            return app(env);
        } catch (e) {
            if (isArray(e))
                return e;
            else 
                return [500, {}, e.toString()];    
//                throw e;
        }    
    }

}
