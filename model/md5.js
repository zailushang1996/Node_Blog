var crypto = require('crypto');
module.exports = function (pwd) {
    var md5 = crypto.createHash('md5');
    var passwprd = md5.update(pwd).digest('base64');
    return passwprd;
};