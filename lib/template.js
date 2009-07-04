/**
 * A simple and portable templating system. 
 * Based on ideas from jsontemplate.org
 *
 * str = the template source as a string
 */ 
var Template = exports.Template = function(str) {
    this.program = compile(Template.filter(str));
}

/**
 * Render the template to a string.
 */
Template.prototype.render = function(data) {
    return execute(this.program, new Scope(data));
}

/**
 * Set this hook to a filter function to pre-manipulate the string used to
 * create the Template. 
 * An example usage would be to pre-apply an XSLT transformation.
 */
Template.filter = function(str) { 
    return str;
}
 
/**
 * Formatting functions used in interpolations.
 * This map can be extended with application-specific formatters.
 */
Template.formatters = {
    html: function(str) {
        return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").
                   replace(/</g, "&lt;");
    },
    attr: function(str) {
        return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").
                   replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },
    uri: encodeURI,
    fixed: function(num) {
    	return Number(num).toFixed();    	
    },
    fixed2: function(num) {
    	return Number(num).toFixed(2);
    }
}

var TOKEN_RE = new RegExp("(\{.+?\}\n?)"),
	COMMAND_RE = /^\{[\.a-zA-Z]/,
    INTERP_RE = /^\{[\w\|]+?\}$/,
	WITH_RE = /(with|if)\s+(\S+)?/;

// A program block.
var Block = function() {
    this.statements = [];
}

// Add a new statement to the program block.
Block.prototype.push = function(stmt) {
    this.statements.push(stmt);
}

// A program scope implemented as a stack of contexts.
var Scope = function(data) {
    this.stack = [data];
}

// Create a new context (frame) in the scope stack. Typically a value in the
// current context is unshifted as a new context.
Scope.prototype.push = function(name) {
    var context = this.stack[0][name];
    
    if (context)
        this.stack.unshift(context);

    return context;
}

Scope.prototype.pop = function() {
    this.stack.shift();
}

Scope.prototype.replace = function(context) {
    this.stack[0] = context;
}

// Lookup the value for the given name in the scope stack.
Scope.prototype.lookup = function(name) {
    var value;
    
    for (var i = 0; i < this.stack.length; i++) {
        value = this.stack[i][name];
        if (value) break;
    }
    
    return value;
}

// [op_write, string]
var op_write = function(stmt) {
    return stmt[1];
}

// [op_interpolate, variableName, [formatters]]
var op_interpolate = function(stmt, scope) {
    var value = scope.lookup(stmt[1]);
    
    if (value) {
        var formatters = stmt[2];
        for (var i = 0; i < formatters.length; i++)
            value = formatters[i](value);
    } 

    return value;    
}

// [op_with, variableName, block]
var op_with = function(stmt, scope) {
    var output = "";
    var context = scope.push(stmt[1]);

    // if there is no context, execute the "else" clause.
    var block = context ? stmt[2] : stmt[2]["else"];

    if (block) {
        if (Array.isArray(context)) { 
            // The context is an array, loop.
            for (var i = 0; i < context.length; i++) {
                scope.replace(context[i]);
                output += execute(block, scope);
            }
        } else
            output = execute(block, scope);
    }
            
    if (context) scope.pop();
    return output;
}

// Execute a template program.
var execute = function(program, scope) {
    var output = [];
    var statements = program.statements;
    
    for (var i = 0; i < statements.length; i++) {
        var stmt = statements[i];
        output.push(stmt[0](stmt, scope));
    }
    
    return output.join("");
}

// Compile the input string into a program (list of statements).
var compile = function(str) {
    var program = new Block();
    var stack = [];
        
    // Split the input string in tokens. 
    var tokens = str.split(TOKEN_RE);
    
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        // FIXME: hack fix to handle {_, for example client side javascript
        // blocks. Come up with a better TOKEN_RE.
        if (token.match(COMMAND_RE)) {
        	if (token.slice(-1) == "\n")
                token = token.slice(null, -1);

            if (token[1] == "#") // comment
                continue;
            
            if (token[1] == ".") { // statement
                token = token.substring(2, token.length-1);
                
                var match = token.match(WITH_RE);
                if (match) { // with block.
                    stack.push(program);
                    var block = new Block();
                    program.push([op_with, match[2], block]);
                    program = block;
                    continue;
                }

                if (token == "else") { // else clause of a with block
                    program = program["else"] = new Block();
                    continue;
                }
                
                if (token == "end") { // end of a with block
                    program = stack.pop();
                    if (!program) throw "Too many {.end} statements";
                    continue;
                }
            } 
            
            if (token.match(INTERP_RE)) { // variable interpolation with optional formatters.
                var parts = token.substring(1, token.length-1).split("|");
                var name = parts.shift();
                var formatters = [];
                for (var j = 0; j < parts.length; j++) {
                    var formatter = Template.formatters[parts[j]];
                    if (formatter) 
                        formatters.push(formatter);
                    else
                        throw "Undefined formatter '" + parts[j] + "'";
                }
                program.push([op_interpolate, name, formatters]);
            } else { // plain text
                program.push([op_write, token]);
            }
        } else { // plain text
            program.push([op_write, token]);
        }
    }

    return program;
}
