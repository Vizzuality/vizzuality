'use strict';

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

require('dotenv').load({ silent: true });

var mailer = require('../lib/sparkpost_mailer');

module.exports = function(app) {

  app.post('/contact', parseForm, csrfProtection, function(req, res) {

    var emailTemplate = ''+
      '<h1>Thank you!</h1>'+
      '<p>We love it when people get in touch with us. One of our expert humans will be sure to respond very shortly</p>' +
      '<p>Your message: <br>' + req.body.message + '</p>';

    var userMessage = {
      content: emailTemplate,
      subject: 'Thank you for contacting us',
      'from_email': process.env.EMAIL_USER,
      'from_name': process.env.EMAIL_NAME,
      recipients: [{
        address: req.body.email
      }]
    };

    var staffMessage = {
      content: req.body.message,
      subject: 'Contact form',
      'from_email': req.body.email,
      recipients: [{
        address: process.env.EMAIL_RECEIVER
      }]
    };

    // To user
    mailer(userMessage, function(err) {
      if (err) {
        return res.status(400).json({ message: 'We’re sorry, but something went wrong. Please try again later.' });
      }
      mailer(staffMessage, function(err2) {
        if (err2) {
          res.status(400).json({ message: 'We’re sorry, but something went wrong. Please try again later.' });
        }
        res.status(200).json({ message: 'Thank you.' });
      });
    });

  });

};
