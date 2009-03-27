var md5 = require("data/digest/md5").MD5.hexdigest;

var salt = CONFIG.captcha.salt;
if (!salt) throw("CONFIG.captcha.salt not defined);

var encode = function(word) {
    return md5(word + salt);
}

/**
 * A CAPTCHA is a program that protects websites against bots by generating and 
 * grading tests that humans can pass but current computer programs cannot.
 *
 * Constraints to consider:
 *
 * Image/code combination could not be reused, means a need to prevent a human 
 * from entering the correct code, capturing a post sent to a server, and then 
 * replaying it many times via a robot.
 *
 * Another point to remember is that a form with a link is generated on the 
 * first browser request, an image is retrieved with another request, and the 
 * Captcha validation goes with the third one. Potentially all three might 
 * arrive to different application servers. 
 * 
 * http://www.captcha.net
 * http://www.recaptcha.net
 * http://revolutiononrails.blogspot.com/2007/04/pedo-mellon-minno-or-captcha-on-rails.html
 * http://blogs.ericmethot.com/captcha
 */
var CAPTCHA = exports.CAPTCHA = function {\
    this.word = 
}

/**
 *
 */
CAPTCHA.image = function(word) {
}

/**
 *
 */
CAPTCHA.valid = function(word, code) {
    return (code == encode(word));
}


/*

    captcha: new CAPTCHA(),
    
    

if (CAPTCHA.valid(captcha, code)) {

} else {

}
*/
