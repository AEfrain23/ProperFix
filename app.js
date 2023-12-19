import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import 'dotenv/config'


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs")
});
app.get("/about", (req, res) => {
  res.render("about.ejs")
});
app.get("/services", (req, res) => {
  res.render("services.ejs")
});
app.get("/gallery", (req, res) => {
  res.render("gallery.ejs")
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs")
});

app.post("/send-message", (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const customerEmail = req.body.email;
  let phone;  // REMEMBER: You cant use a variable declared in an 'if' statement outside of that statement. It must first be decalred outside.
  if (req.body.phone) {
    phone = req.body.phone;
  } else {
    phone = "NOT PROVIDED";
  }
  const customerMessage = req.body.message;

  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: "angelefrain23@gmail.com",
      pass: process.env.SMTP_KEY
    }
  });

  const message = {
    from: customerEmail,
    to: "pro-ff@hotmail.co.uk",
    subject: "properfix.com - " + fName + " " + lName,
    text: "Name: " + fName + " " + lName +
      "\n" + "Phone: " + phone +
      "\n" + "Message: " + customerMessage  // REMEMBER: "\n" in concactonation creates a new line break.
  }

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });

  // function sendEmail() {
  //   Email.send({
  //     Host: "smtp-relay.sendinblue.com",
  //     Port: "587",
  //     Login: "angelefrain23@gmail.com",
  //     Password: "X4ZkM5cKN0DRHt1d",
  //     To: 'angelefrain23@gmail.com',
  //     From: "angelefrain96@hotmail.com",
  //     Subject: "Sending Email using javascript",
  //     Body: "Well that was easy!!",
  //   })
  //     .then(function (message) {
  //       alert("mail sent successfully")
  //     });
  // }
  res.redirect("/contact");
});

app.listen(port, () => {
  console.log("Server is runing on port 3000");
});