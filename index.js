require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const mailjet = require ('node-mailjet')
.connect(process.env.MAILJET_PUBLIC_API_KEY, process.env.MAILJET_PRIVATE_API_KEY)
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(__dirname + "/" + "main.html"))

app.use(cors())
app.use(bodyParser.json())
app.post('/', (req, res) => {
    //save the message
   recipient = req.body.recipient
   sender = req.body.sender
   subject = req.body.subject
   text = req.body.text
   const msg = {
      to: recipient,
      from: `${sender}@example.com`,
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
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": 'Joacity49@rhyta.com',
                "Name": sender
            },
            "To": [
                {
                "Email": recipient,
                "Name": ""
                }
            ],
            "Subject": subject,
            "TextPart": text,
            "CustomID": "AppGettingStartedTest"
            }
        ]
        })
        request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
   })

 })


app.listen(3001, () => console.log(`Example app listening on port 3001!`))