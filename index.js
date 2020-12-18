var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var message = req.body.message
  var intent = req.body.intent
  var timeline = req.body.timeline
  var content = `name: ${name} \n phone: ${phone} \n email: ${email} \n intent:${intent} \n timeline:${timeline} \n message: ${message} `
  var mail = {
    from: name,
    to: 'jfadelli@gmail.com',  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})

router.post('/newProperty', (req, res, next) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var street_address = req.body.street_address
    var city = req.body.city
    var zip = req.body.zip
    var country = req.body.country
    var property_type = req.body.property_type
    var building_sf = req.body.building_sf
    var lot_size = req.body.lot_size
    var content = `
        name: ${name} \n 
        phone: ${phone} \n 
        email: ${email} \n 
        street_address:${street_address} \n 
        city:${city} \n 
        zip: ${zip} \n
        country: ${country}\n 
        property_type: ${property_type}\n
        building_sf: ${building_sf}\n
        lot_size: ${lot_size}\n
        `

    var mail = {
      from: name,
      to: 'jfadelli@gmail.com',  // Change to email address that you want to receive messages on
      subject: 'New Property Evaluation Form Submitted',
      text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail'
          })
        } else {
          res.json({
           status: 'success'
          })
        }
    })
})


const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)