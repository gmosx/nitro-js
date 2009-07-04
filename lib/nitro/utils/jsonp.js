var JSONPResponse = exports.JSONPResponse = function(data, callback) {
	var response = callback + "(" + JSON.stringify(data) + ");";
	return [200, {"Content-Type": "application/javascript"}, [response]];	
}