const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayut: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('home')
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)

})