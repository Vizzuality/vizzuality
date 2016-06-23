'use strict';

require('dotenv').load({ silent: true });

const SparkPost = require('sparkpost');
const sp = new SparkPost(process.env.SPARKPOST_API_KEY);

/**
 * Module wrapper of SparkPost API
 * @param  {String} subject
 * @param  {Object} message
 * @param  {Array} recipients
 * @param  {Function} cb
 */

module.exports = function(settings, cb) {
  sp.transmissions.send({
    transmissionBody: {
      content: {
        from: settings.from_email,
        subject: settings.subject || 'Example subject',
        html: settings.content || '<p>Example content</p>',
      },
      recipients: settings.recipients
    }
  }, function(err) {
    if (err) {
      console.log('Whoops! Something went wrong');
      console.log(err);
      if (cb && typeof cb === 'function') {
        cb(err);
      }
    } else {
      console.log('Woohoo! You just sent your mailing!');
      if (cb && typeof cb === 'function') {
        cb(null);
      }
    }
  });
};
