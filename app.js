import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';  // node-fetch v2 // For sending requests to reCAPTCHA API
import ejs from 'ejs';
import 'dotenv/config'


const app = express();
const port = 3004;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  const date = new Date;
  res.render("index.ejs", { year: date.getFullYear() });
});
app.get("/about", (req, res) => {
  const date = new Date;
  res.render("about.ejs", { year: date.getFullYear() });
});
app.get("/services", (req, res) => {
  const date = new Date;
  res.render("services.ejs", { year: date.getFullYear() });
});
app.get("/gallery", (req, res) => {
  const date = new Date;
  res.render("gallery.ejs", { year: date.getFullYear() });
});
app.get("/contact", (req, res) => {
  const date = new Date;
  res.render("contact.ejs", { year: date.getFullYear() });
});



// POST route for form submission
app.post('/send-message', (req, res) => {
  const { fName, lName, email, phone, customerMessage, 'g-recaptcha-response': captchaResponse } = req.body;

  // Step 1: Verify reCAPTCHA response with Google
  const secretKey = process.env.RECAPTCHA_KEY;  // Store this in your .env file

  const params = new URLSearchParams({
    secret: secretKey,
    response: captchaResponse,
    remoteip: req.ip,
  });

  fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params,
  })
    .then(response => response.json())
    .then(data => {
      // Step 2: If reCAPTCHA validation is successful, send the email
      if (data.success) {
        console.log("Successful reCAPTCHA validation");

        let transporter = nodemailer.createTransport({
          host: 'smtp-relay.brevo.com',
          port: 587,
          auth: {
            user: "angelefrain23@gmail.com",
            pass: process.env.SMTP_KEY,
          },
        });

        const message = {
          from: email,
          to: "properfix.co@gmail.com",
          subject: "properfix.com - " + fName + " " + lName,
          text: "Name: " + fName + " " + lName +
            "\n" + "Phone: " + phone +
            "\n" + "Message: " + customerMessage  // REMEMBER: "\n" in concactonation creates a new line break.
        }

        // Send the email using Nodemailer
        transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error sending email" });
          } else {
            console.log(info);
            const emailSent = "Email sent successfully";
            const textResponse = "Thank you for you message.";
            // Step 3: Render the confirmation page with a success message
            res.render("index.ejs", { confirmation: emailSent, message: textResponse });  // Render the EJS page with the confirmation message
          }
        });

      } else {
        // If reCAPTCHA failed, render the contact page with an error message
        const errorMessage = "reCAPTCHA validation failed";
        const textResponse = "Please try again.";
        console.log("reCAPTCHA validation failed.")
        res.render("index.ejs", { confirmation: errorMessage, message: textResponse });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Error validating reCAPTCHA" });
    });

})


app.listen(port, () => {
  console.log("Server is runing on port 3004");
});