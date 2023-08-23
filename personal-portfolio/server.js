const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
require(`dotenv`).config();
const formidable = require('express-formidable');

const PORT = process.env.PORT || 5005;

//Middleware
router.use(express.static('public'));
router.use(express.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(formidable());

router.get('/', (req, res) => {
  res.sendFile(__dirname + `/public/index.html`);
})

router.post(`/`, (req, res) => {
  console.log(req.fields.body);

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: `yuyahamadakasuton@gmail.com`,
  //     pass: process.env.password01
  //   }
  // })
  // const mailOptions = {
  //   from: req.body.email,
  //   to: `yuyahamadakasuton@gmail.com`,
  //   subject: `Message from ${req.body.email}: ${req.body.subject}`,
  //   text: req.body.message
  // }

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if(error) {
  //     console.log(error);
  //     res.send('error')
  //   } else {
  //     console.log(`Email send: ` + info.response);
  //     window.alert(`success`);
  //   }
  // })
})

app.listen(PORT, () => {
  console.log(`Server ${PORT}`)
})
