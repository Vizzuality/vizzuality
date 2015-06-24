'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

module.exports = function(app) {

  app.post('/contact', function(req, res) {

    var userMessage = {
      text: 'Thank you! We love it when people get in touch with us. One of our expert humans will be sure to respond very shortly',
      html: '<h1>Thank you!</h1><p>We love it when people get in touch with us. One of our expert humans will be sure to respond very shortly</p>',
      subject: 'Thank you for contacting us',
      'from_email': process.env.EMAIL_USER,
      'form_name': process.env.EMAIL_NAME,
      to: [{
        email: req.body.email,
        type: 'to'
      }]
    };

    var staffMessage = {
      html: req.body.message,
      'from_email': req.body.email,
      subject: 'Contact form',
      to: [{
        email: process.env.EMAIL_RECEIVER,
        type: 'to'
      }]
    };

    mandrillClient.messages.send({
      message: staffMessage,
      async: false
    }, function() {

      mandrillClient.messages.send({
        message: userMessage,
        async: false
      }, function() {
        // Success
        res.status(200).json({ message: 'Thank you.' });
      }, function(e) {
        if (e) {
          res.status(400).json({ message: 'We’re sorry, but something went wrong. Please try again later.' });
        }
      });

    }, function(e) {
      if (e) {
        res.status(400).json({ message: 'We’re sorry, but something went wrong. Please try again later.' });
      }
    });

  });

};
