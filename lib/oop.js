
/**
 * Object inheritance.
 * Example:
 *   Object.extend(Article, Content);
 */
Object.extend = function(ctor, zuper) {
    ctor.__proto__ = zuper;
    ctor.prototype.__proto__ = zuper.prototype;
    
    if ("function" == typeof(zuper.extended))
        zuper.extended(ctor);
}

/**
 * Object mixin.
 * Example:
 *   Object.include(Article, Tagable, Timestamped);
 */
Object.include = function(ctor) {
    for (var i = 1; i < arguments.length; i++) {
        var mixin = arguments[i];
        
        if ("function" == typeof(mixin.included)) {
            mixin.included(ctor);
        } else {
            for (var p in mixin) 
                ctor[p] = ctor[p] || mixin[p];

            if (mixin.prototype)
                for (var p in mixin.prototype)  {
                    ctor.prototype[p] = ctor.prototype[p] || mixin.prototype[p];
                }
        }
    }
}
