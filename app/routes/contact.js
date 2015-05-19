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
      subject: 'Thank you for contact us',
      text: 'Thank you! /r Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias perferendis asperiores eos vel neque molestiae praesentium iste veritatis obcaecati mollitia. Sit debitis est consequuntur aut aliquid alias dolorem optio doloremque',
      html: '<h1>Thank you!</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias perferendis asperiores eos vel neque molestiae praesentium iste veritatis obcaecati mollitia. Sit debitis est consequuntur aut aliquid alias dolorem optio doloremque</p>'
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
          res.status(400).json({ message: 'We\'re sorry, but something went wrong. Please, try again later.' });
        } else {
          res.status(200).json({ message: 'Thank you.' });
        }
      });
    });
  });

};
