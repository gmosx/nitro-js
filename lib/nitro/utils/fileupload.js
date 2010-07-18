// TODO: Convert to Ringo or deprecate in favor of blobstore.

var JDiskFileItemFactory = Packages.org.apache.commons.fileupload.disk.DiskFileItemFactory,
    JServletFileUpload = Packages.org.apache.commons.fileupload.servlet.ServletFileUpload;

var ByteString = require("binary").ByteString,
    IO = require("io-engine").IO;

var jupload = new JServletFileUpload();

/**
 * Parses a multipart request in memory using Apache Commons FileUpload.
 * Compatible with Google App Engine (no temp file created).
 * 
 * The following jars are required:
 * - commons-fileupload-1.2.X.jar
 * - commons-io.1.X.jar
 *
 * http://commons.apache.org/fileupload/index.html
 */
exports.parseMultipart = function(env) {
    var params = env["jack.request.params_hash"];
    if (!params) {
        params = env["jack.request.params_hash"] = {};
        
        var jrequest = env["jack.servlet_request"];
        var iterator = jupload.getItemIterator(jrequest);

        while (iterator.hasNext()) {
            var item = iterator.next(),
                field = String(item.getFieldName()),
                io = new IO(item.openStream());
            
            if (item.isFormField()) {
                params[field] = io.read().toString("utf8");
            } else {
                var data = io.read();
                params[field] = {
                    name: String(item.getName()),
                    type: String(item.contentType),
                    size: data.length,
                    data: data
                }
            }
        }
    }

    return params;
}
