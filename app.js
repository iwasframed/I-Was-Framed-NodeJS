require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const bodyParser = require('body-parser');
const { send } = require('express/lib/response');
var Fraction = require('fractional').Fraction
var nodemailer = require('nodemailer');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

// Navigation
app.get('', (req, res) => {
    res.render('index')
});

 app.get("/about", (req,res) => {
    res.render('about', { title: 'About Page'});

});

app.get('/about', function(req, res) {
    var locals = {
      title: 'About',
      description: 'About Us',
      header: 'I Was Framed - About'
    };
    res.render('the-view', locals);
  });

app.get("/contact", (req,res) => {
    res.render('contact', { title: 'Contact Us'});

});

app.post('/contact', (req, res) => {
    console.log(req.body)


  const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      // secure: true,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
      }
  });


    const mailOptions = {
        from: req.body.email,
        to: process.env.SMTP_USER,
        subject:`Message from ${req.body.email}:  ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

  

app.get("/documentation", (req,res) => {
    res.render('documentation', { title: 'Documentation'});

});

app.get("/math", (req,res) => {
    res.render('math', { title: 'Math Equations'});
});

app.get("/api", (req,res) => {
    res.render('api', { title: 'API Instructions'});

});

app.get("/api/calculator", (req,res,) => {
    res.render("calculator");
});

app.post("/api/calculator", (req,res) => {
    
    let FrameWidth = req.body.FrameWidth;
    let FrameWidthFraction = req.body.FrameWidthFraction
    let FrameHeight = req.body.FrameHeight;
    let FrameHeightFraction = req.body.FrameHeightFraction;
    let PictureWidth = req.body.PictureWidth;
    let PictureWidthFraction = req.body.PictureWidthFraction;
    let PictureHeight = req.body.PictureHeight;
    let PictureHeightFraction = req.body.PictureHeightFraction;
    let MatOverlap = req.body.MatOverlap;
    let width = (1/2)*((FrameHeight+FrameHeightFraction)-(PictureHeight+PictureHeightFraction)+MatOverlap);
    let height = (1/2)*((FrameWidth+FrameWidthFraction)-(PictureWidth+PictureWidthFraction)+MatOverlap);
    res.send(`Width = ${new Fraction(height).toString()}", Height = ${new Fraction(width).toString()}"`);
});


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));