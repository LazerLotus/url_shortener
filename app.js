const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const url_shortener = require('./url_shortener')


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayut: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  const input_url = req.body.input_url
  let output_url = url_shortener()
  console.log(input_url)
  console.log(output_url)
  //redirect('/result')
})

app.get('/result', (req, res) => {
  res.render('result')
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)

})