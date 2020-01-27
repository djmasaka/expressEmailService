require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const mailgun = require("mailgun-js");
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => res.sendFile(__dirname + "/" + "main.html"))

app.post('/', (req, res) => {
    //save the message
   recipient = req.body.recipient
   sender = req.body.sender
   subject = req.body.subject
   text = req.body.text
   const msg = {
      to: recipient,
      from: `${sender}@oursite.com`,
      subject: subject,
      text: text,
   }
   console.log(msg)
   //configure and send the message with sengrid
   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
   sgMail.send(msg)
   .then(() =>{
       response = {sent: true}
       res.send(response)
   })
   .catch(error =>{
       //if it fails print the error and try the mailgun service
        console.log(error)
        console.log("The email service had an error")
        const DOMAIN = process.env.DOMAIN;
        const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
        const data = {
            from: `Mailgun Sandbox <postmaster@${process.env.DOMAIN}>`,
            to: recipient,
            subject: subject,
            text: text
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
   })

 })


app.listen(3001, () => console.log(`Example app listening on port 3001!`))