exports.JSONPResponse = function(data, callback) {
	var response;
	if (typeof(data) == "string")
		response = callback + "(" + data + ");";
	else
		response = callback + "(" + JSON.stringify(data) + ");";
	return [200, {"Content-Type": "application/javascript"}, [response]];	
}

exports.JSONResponse = function(data) {
	return [200, {"Content-Type": "application/json"}, [JSON.stringify(data)]];	
}
