var nodemailer = require('nodemailer');

// Mailer
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = function(app) {

  'use strict';

  app.post('/contact', function(req, res) {
    var userMailOptions = {
      from: 'Vizzuality <hello@vizzuality.com>',
      to: req.body.email,
      subject: 'Thank you for contacting us',
      text: 'Thank you! We love it when people get in touch with us. One of our expert humans will be sure to respond very shortly',
      html: '<h1>Thank you!</h1><p>We love it when people get in touch with us. One one of our expert humans will be sure to respond very shortly</p>'
    };
    var staffMailOptions = {
      from: req.body.email,
      to: process.env.EMAIL_RECEIVER,
      subject: 'Contact form',
      html: req.body.message
    };

    transporter.sendMail(userMailOptions, function() {
      transporter.sendMail(staffMailOptions, function(error) {
        if (error) {
          res.status(400).json({ message: 'We’re sorry, but something went wrong. Please try again later.' });
        } else {
          res.status(200).json({ message: 'Thank you.' });
        }
      });
    });
  });

};
