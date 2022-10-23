const express = require('express')
const router = express.Router()
const Urls = require('../../models/urls')

router.get('/', (req, res) => {
  res.render('home')
})

router.post('/', (req, res) => {
  const host = req.get('host').toString()
  const input_url = req.body.input_url
  let output_url = ''
  return Urls.find()
    .lean()
    .then((urls) => {
      // 輸入相同網址時，回傳先前生成過的縮址。
      //check this url exist in db then show the db data
      if (urls.filter((data) => data.original_url.includes(input_url)).length) {
        output_url = urls.filter((data) => data.original_url.includes(input_url))[0].short_url
        return res.render('result', { short_url: output_url, host: host })
      } else {
        //Generate short url and check whether it is duplicated or not. 
        do {
          output_url = url_shortener()
        } while (urls.filter((data) => data.short_url.includes(output_url)).length)

        //if it is a new url , generate a new short url 如果網址沒有重複，生成新的網址
        return Urls.create({ original_url: input_url, short_url: output_url })
          .then(() => {
            res.render('result', { short_url: output_url, host: host })
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

router.get('/:link', (req, res) => {
  const link = req.params.link

  return Urls.find()
    .lean()
    .then((urls) => {
      if (urls.filter((data) => data.short_url.includes(link)).length !== 0) {
        let original_url = urls.filter((data) => data.short_url.includes(link))[0].original_url
        return res.redirect(302, `${original_url}`)
      } else {
        const host = req.get('host').toString()
        res.render('noResult', { short_url: link, host: host })
      }

    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

module.exports = router