const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const bodyParser = require('body-parser');
const { send } = require('express/lib/response');
var fractional = require("./public/js/fraction.js");
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

app.get("/register", (req,res) => {
    res.render('register', { title: 'Register'});

});

 app.get("/about", (req,res) => {
    res.render('about', { title: 'About Page'});

});

app.get("/contact", (req,res) => {
    res.render('contact', { title: 'Contact Us'});

});

app.get("/documentation", (req,res) => {
    res.render('documentation', { title: 'Documentation'});

});

app.get("/measurements", (req,res,next) => {
    res.render("measurements");
});

app.get("/measurements/calculate", (req,res,) => {
    res.render("measurements");
});

app.post("/measurements/calculate", (req,res) => {
    
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