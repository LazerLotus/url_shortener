const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const url_shortener = require('./url_shortener')
const routes = require('./routes')

require('./config/mongoose')
app.engine('hbs', exphbs({ defaultLayut: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

let server = app.listen(port, () => {

  console.log(`Express is listening on ${server.address().address}:${server.address().port}`)

})