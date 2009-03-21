// Based on Apache Commons HttpClient.
// THINK: investigate if we can use HttpURLConnection instead.

var JHttpClient = Packages.org.apache.commons.httpclient.HttpClient,
    JHttpStatus = Packages.org.apache.commons.httpclient.HttpStatus,
    JNameValuePair = Packages.org.apache.commons.httpclient.NameValuePair,
    JGetMethod = Packages.org.apache.commons.httpclient.methods.GetMethod,
    JPostMethod = Packages.org.apache.commons.httpclient.methods.PostMethod;

var HTTPClient = exports.HTTPClient = function(uri) {
    this.uri = uri;
    this.client = new JHttpClient();
}

/**
 * Perform an HTTP GET request.
 * @author gmosx
 */
HTTPClient.prototype.get = HTTPClient.prototype.GET = function() {
    var method = new JGetMethod(this.uri);

    try {
        var status = this.client.executeMethod(method);

        if (JHttpStatus.SC_OK != status) {
            return "<error>" + status + "</error>";
        } else {
            return new String(method.getResponseBodyAsString());
        }
    } catch (e) {
        return "<error>" + e.toString() + "</error>";
    } finally {
        method.releaseConnection();
    }
}

/**
 * Perform an HTTP POST request.
 * @author gmosx
 */
HTTPClient.prototype.post = HTTPClient.prototype.POST = function(data) {
    var method = new JPostMethod(this.uri);

    var post = [];
    for (var i in data) 
        post.push(new JNameValuePair(i, data[i]));
    
    method.setRequestBody(post);

    try {
        var status = this.client.executeMethod(method);

        if (JHttpStatus.SC_OK != status) {
            return "<error>" + status + "</error>";
        } else {
            return new String(method.getResponseBodyAsString());
        }
    } catch (e) {
        return "<error>" + e.toString() + "</error>";
    } finally {
        method.releaseConnection();
    }
}

HTTPClient.get = HTTPClient.GET = function(uri) {
    return new HTTPClient(uri).get();
}

HTTPClient.post = HTTPClient.POST = function(uri, data) {
    return new HTTPClient(uri).post(data);
}
