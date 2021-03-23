const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')


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

// Template engine
app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
  }),
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))

route(app)
app.get('/favicon.ico', (req, res) => res.status(204));


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})