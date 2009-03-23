// Format a Date object as a string according to a subset of the ISO-8601 standard.
// Useful in Atom.
Date.prototype.toISOString = function() {
	return (this.getFullYear() + "-" + this.getMonth() + "-" + this.getDate() + "T" + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds() + "Z"); 
}

/*
// Format a Date object as a MySQL date-time string.
Date.prototype.toSQLString() = function() {
    return this.getFullYear() + "-" + this.getMonth() + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
}
*/

// Parse a MySQL datetime string.
// Input format: 2007-06-05 15:26:02(.0)
Date.fromSQLString = function(sql) {
	if (sql) {
		var regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?(\..)?$/;
		var parts = sql.replace(regex,"$1 $2 $3 $4 $5 $6").split(" ");
		return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
	} else {
		return new Date();
	}
}
