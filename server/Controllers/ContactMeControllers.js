const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { response } = require('express');

dotenv.config();

// configuring transpoter for sending message from browser as an email
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PWD,
    },
    tls: {
        rejectUnauthorized: false
    }
});


module.exports.contacteMeMessage = async (req, res) => {
    //get the data from frontend of message to send
    const info = req.body;

    if (info) {
        //message to send
        const mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: process.env.GOOGLE_RECIPIENT_EMAIL,
            subject: `Message from ${info.name} email ${info.email}`,
            text: info.message,
        };
        
        transporter.sendMail(mailOptions)
        .then(response => {
            res.status(201).json({ message: 'Message sent successfully', response: response});
        })
        .catch(error => {
            res.status(400).json({ message: 'Error sending message try again later', error: error});
        });
    }
}

