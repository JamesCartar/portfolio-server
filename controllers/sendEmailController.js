require('dotenv').config();
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "arjunyadav.portfolio@gmail.com",
    pass: "gpyuwxobhykouejh",
  },
})


const sendEmail = async (req, res, next) => {

  let mailDetails = {
    from: 'arjunyadav.portfolio@gmail.com',
    to: "arjunyadav.hash@gmail.com",
    subject: 'Contact From Portfolio',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Us</title>
    </head>
    <body>
      <h3><strong>From:</strong></h3>
      <h4>name: <strong>${req.body.name}</strong></h4>
      <h4>email: <strong>${req.body.email}</strong></h4>
      
      <h3>Message:</h3>
      <p>${req.body.message}</p>
    </body>
    </html>
    `
  };

  transporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
  });


  res.status(200).json({ success: true, msg: 'Messagen send successfully :)' });
};



module.exports = { sendEmail };