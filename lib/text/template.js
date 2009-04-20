/**
 * A simple and portable templating system.
 */ 
var Template = exports.Template = function(str) {
    this.program = compile(str);
}

/**
 * Render the template to a string.
 */
Template.prototype.render = function(data) {
    return execute(this.program, new Scope(data));
}

/**
 * Formatting functions used in interpolations.
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
    uri: encodeURI
}

var TOKEN_RE = new RegExp("(" + "\\{.+?\\}\n?)"),
    WITH_RE = /(with)\s+(\S+)?/;

// A program block.
var Block = function() {
    this.statements = [];
}

Block.prototype.push = function(stmt) {
    this.statements.push(stmt);
}

// A program scope,
var Scope = function(data) {
    this.stack = [data];
}

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

Scope.prototype.lookup = function(name) {
    var value;
    
    for (var i in this.stack) {
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
        for (var i in formatters) {
            value = formatters[i](value);
        }
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
            for (var i in context) {
                scope.replace(context[i]);
                output += execute(block, scope);
            }
        } else {
            output += execute(block, scope);
        }
    }
            
    if (context) scope.pop();
    return output;
}

// Execute a template program.
var execute = function(program, scope) {
    var output = [];
    var statements = program.statements;
    
    for (var i in statements) {
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
    
    for (var i in tokens) {
        var token = tokens[i];
                
        if (token[0] == "{") {
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
            } else { // variable interpolation with optional formatters.
                var parts = token.substring(1, token.length-1).split("|");
                var name = parts.shift();
                var formatters = [];
                for (var i in parts) {
                    var formatter = Template.formatters[parts[i]];
                    if (formatter) 
                        formatters.push(formatter);
                    else
                        throw "Undefined formatter '" + parts[i] + "'";
                }
                program.push([op_interpolate, name, formatters]);
            }
        } else { // plain text
            program.push([op_write, token]);
        }
    }

    return program;
}
