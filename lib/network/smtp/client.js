var JProperties = Packages.java.util.Properties;
    
var JAuthenticator = Packages.javax.mail.Authenticator,
    JMessage = Packages.javax.mail.Message,
    JPasswordAuthentication = Packages.javax.mail.PasswordAuthentication,
    JSession = Packages.javax.mail.Session,
    JTransport = Packages.javax.mail.Transport,
    JInternetAddress = Packages.javax.mail.internet.InternetAddress,
    JMimeMessage = Packages.javax.mail.internet.MimeMessage;

/**
 * An SMTP client.
 */
var Client = exports.Client = function(options) {
    this.options = options;
	this.props = new JProperties();

	this.props.put("mail.smtp.host", options.host);
	this.props.put("mail.smtp.port", options.port);
	this.props.put("mail.smtp.auth", "true");
	this.props.put("mail.smtp.user", options.user);
	this.props.put("mail.smtp.password", options.password);
//	this.props.put("mail.debug", "true");
	
    this.authenticator = JAuthenticator({
        getPasswordAuthentication: function() {
            return JPasswordAuthentication(options.user, options.password);
        }
    });
}

/**
 * Send an email through SMTP.
 */
Client.prototype.sendMail = function(mail) {
    var session = JSession.getDefaultInstance(this.props, this.authenticator);
//  session.setDebug(true);
    
    var msg = new JMimeMessage(session);
    
	msg.setSender(new JInternetAddress(mail.from));
	msg.setSubject(mail.subject);
	msg.setContent(mail.body, mail.contentType || "text/plain");

	if (mail.to.indexOf(",") > 0)
		msg.setRecipients(JMessage.RecipientType.TO, JInternetAddress.parse(mail.to));
	else
		msg.setRecipient(JMessage.RecipientType.TO, new JInternetAddress(mail.to));

    JTransport.send(msg);
}
