var Base64 = exports.Base64 = {};

// The term Base64 refers to a specific MIME content transfer encoding. It is 
// also used as a generic term for any similar encoding scheme that encodes 
// binary data by treating it numerically and translating it into a base 64 
// representation. The particular choice of base is due to the history of 
// character set encoding: one can choose a set of 64 characters that is both 
// part of the subset common to most encodings, and also printable. This 
// combination leaves the data unlikely to be modified in transit through 
// systems, such as email, which were traditionally not 8-bit clean.

/**
 * Base64 encode the input string.
 */
Base64.encode = function(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) { 
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	} while (i < input.length);
	
	return output;    
},

/**
 * Base64 decode the input string.
 */
Base64.decode = function(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
		if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
	} while (i < input.length);

	return output;     
}

