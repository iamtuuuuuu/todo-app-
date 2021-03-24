const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')


const db = require('./config/db')
// Connect db
db.connect()


// passport config
require('./config/passport')(passport)

const app = express()
const port = 3000



const route = require('./routes')

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
      extended: true,
  }),
)
app.use(express.json())

app.use(methodOverride('_method'))

// Template engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
  }),
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))



// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// add passport middleware
// it is very important to add this after the express session
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg'); // needed for flash to work
  res.locals.error_msg = req.flash('error_msg');     // needed for flash to work
  res.locals.error = req.flash('error');             // needed for flash to work
  res.locals.user = req.user || null;                // needed for passport login/logout to work
  next();
})

route(app)
app.get('/favicon.ico', (req, res) => res.status(204));


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})