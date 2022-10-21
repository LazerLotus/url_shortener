const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const url_shortener = require('./url_shortener')
const Urls = require('./models/urls')


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
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  const input_url = req.body.input_url
  let output_url = ''
  return Urls.find()
    .lean()
    .then((urls) => {
      //check this url exist in db then show the db data
      const aaa = urls.filter((data) => data.original_url.includes(input_url)).length
      const bbb = url_shortener()
      console.log(aaa, bbb)

      if (urls.filter((data) => data.original_url.includes(input_url)).length) {
        output_url = urls.filter((data) => data.original_url.includes(input_url))[0].short_url
        console.log('AA', output_url)
        return res.render('result', { short_url: output_url })
      } else {
        //Generate short url and check whether it is duplicated or not.
        do {
          output_url = url_shortener()
          console.log('BB', output_url)
        } while (urls.filter((data) => data.short_url.includes(output_url)).length)

        //if it is a new url , generate a new short url
        return Urls.create({ original_url: input_url, short_url: output_url })
          .then(() => {
            console.log('CC')
            res.render('result', { short_url: output_url })
          })
          .catch(error => {
            console.log(error)
            res.render('errorPage', { error: error.message })
          })

      }
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

app.get('/:link', (req, res) => {
  const link = req.params.link
  return Urls.find()
    .lean()
    .then((urls) => {
      console.log(urls)
      console.log(link)

      if (urls.filter((data) => data.short_url.includes(link))) {
        let original_url = urls.filter((data) => data.short_url.includes(link))[0].original_url
        return res.redirect(302, `${original_url}`)
      }


    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})


let server = app.listen(port, () => {

  console.log(`Express is listening on ${server.address().address}:${server.address().port}`)

})