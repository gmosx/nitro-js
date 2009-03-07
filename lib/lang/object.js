
/**
 * A simple utility to for constructing object hierarchies based on prototypical
 * inheritance.
 *
 * Returns a constructor function that creates objects. The prototype of the 
 * constructor is set to an instance of the superconstructor.
 *
 * FIXME: cleanup the names used in this implementation, add comments to explain
 * how this works.
 */
Object.extend = function(superconstructor, constructor) {
    if (typeof(superconstructor) == "object") {
        // If an object is passed as super, convert it to a function
        // super constructor.
        var f = function() {};
        f.prototype = superconstructor;
        superconstructor = f;
    } 

    // use an empty function as default.
    constructor = constructor || function() {};

    var proto = constructor.prototype = new superconstructor();

    // Delete any instance properties of the prototype object, only it's 
    // prototype properties are needed.
    for (var p in proto)
        if (proto.hasOwnProperty(p)) delete proto[p];

    // Since the prototype was created with the superclass constructor
    // we need to reassign the constructor to this.
    constructor.prototype.constructor = constructor;
    
    // Keep a reference to the superclass for chaining etc.
    constructor.prototype.superclass = superconstructor;

    // Inject a special method to the constructor to include mixin objects.
    // All mixin properties are injected in the target's prototype.
    constructor.include = function() {
        for (var i = 0; i < arguments.length; i++) {
            var mixin = arguments[i];
    
            if (typeof(mixin) == "function") {
                mixin = mixin.prototype;
            }
                    
            for (var p in mixin)
                this.prototype[p] = mixin[p];
        }
    }

    // Return the constructor for the new object class.
    return constructor;
}

