'use strict';

require('dotenv').load({ silent: true });

var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

/**
 * Module wrapper of Mandrill API
 * @param  {String} subject
 * @param  {Object} message
 * @param  {Array} recipients
 * @param  {Function} cb
 */
module.exports = function(subject, message, recipients, cb) {

  var messageConfig = {
    'html': message && message.html ? message.html : '<p>Example content</p>',
    // 'text': message && message.text ? message.text : 'Example content',
    'subject': subject || 'Example subject',
    'from_email': process.env.MANDRILL_FROM_EMAIL,
    'from_name': process.env.MANDRILL_FROM_NAME,
    'to': recipients
  };

  mandrillClient.messages.send({
    message: messageConfig,
    async: false
  }, function(result) {
    if (cb && typeof cb === 'function') {
      cb(null, result);
    }
  }, function(e) {
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    if (cb && typeof cb === 'function') {
      cb(e);
    }
  });

};
