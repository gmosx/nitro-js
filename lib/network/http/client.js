// Based on Apache Commons HttpClient.
// THINK: investigate if we can use HttpURLConnection instead.

var JHttpClient = Packages.org.apache.commons.httpclient.HttpClient,
    JHttpStatus = Packages.org.apache.commons.httpclient.HttpStatus,
    JNameValuePair = Packages.org.apache.commons.httpclient.NameValuePair,
    JGetMethod = Packages.org.apache.commons.httpclient.methods.GetMethod,
    JPostMethod = Packages.org.apache.commons.httpclient.methods.PostMethod;

var Client = exports.Client = function(uri) {
    this.uri = uri;
    this.client = new JHttpClient();
}

/**
 * Perform an HTTP GET request.
 * @author gmosx
 */
Client.prototype.get = Client.prototype.GET = function() {
    var method = new JGetMethod(this.uri);

    try {
        var status = this.client.executeMethod(method);

        if (JHttpStatus.SC_OK != status) {
            return status.toString();
        } else {
            return new String(method.getResponseBodyAsString());
        }
    } finally {
        method.releaseConnection();
    }
}

/**
 * Perform an HTTP POST request.
 * @author gmosx
 */
Client.prototype.post = Client.prototype.POST = function(data) {
    var method = new JPostMethod(this.uri);

    var post = [];
    for (var i in data) 
        post.push(new JNameValuePair(i, data[i]));
    
    method.setRequestBody(post);

    try {
        var status = this.client.executeMethod(method);

        if (JHttpStatus.SC_OK != status) {
            return status.toString();
        } else {
            return new String(method.getResponseBodyAsString());
        }
    } finally {
        method.releaseConnection();
    }
}

Client.get = Client.GET = function(uri) {
    return new Client(uri).get();
}

Client.post = Client.POST = function(uri, data) {
    return new Client(uri).post(data);
}
