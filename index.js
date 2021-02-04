var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');
const PORT = process.env.PORT || 5000;

const welcome = express.Router();

welcome.get('/', async (req, res, next) => {
    try {
        res.json({ message: 'welcome to the API' })
    }
    catch (err) {
        next(err)
    }
})

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
  var agent = req.body.agent
  var message = req.body.message
  var intent = req.body.intent
  var timeframe = req.body.timeframe
  var content = `name: ${name} \n phone: ${phone} \n email: ${email} \n intent:${intent} \n timeline:${timeframe} \n message: ${message}`
  var mail = {
    from: name,
    to: agent,  // Change to email address that you want to receive messages on
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
      to: 'mhughes@kwcommercial.com',  // Change to email address that you want to receive messages to
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

//jasonfadelli.com
router.post('/send/jasonfadelli', (req, res, next) => {
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n phone: ${phone} \n email: ${email} \n message: ${message}`
  var mail = {
    from: email,
    to: 'jfadelli@gmail.com',  // Change to email address that you want to receive messages on
    subject: 'New Message from jasonfadelli.com',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err)
      res.json({
        status: 'fail'
      })
    } else {
      console.log(data)
      res.json({
       status: 'success'
      })
    }
  })
})



const app = express()
app.use(cors())
app.use(express.json())
app.use('/', welcome)
app.use('/api/', router)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'something went wrong' })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})