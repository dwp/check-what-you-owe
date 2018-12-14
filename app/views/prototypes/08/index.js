const express = require('express')
const router = express.Router()

/**
 * Prototype index
 */
router.all('/', (req, res) => {
  req.session = {}
  res.render(`${__dirname}/views/start`)
})

/**
 * View catch all
 */
router.all('/:view', (req, res) => {
  res.render(`${__dirname}/views/${req.params.view}`)
})

// 08 prototype routing

// Making an addition payment
router.post('/views/additional-payment/additional-payment-calculator', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['additional-payment'] || 0)

  if (answer <= 100) {
    res.redirect('/prototypes/08/views/additional-payment/small')
  }

  if (answer <= 250) {
    res.redirect('/prototypes/08/views/additional-payment/medium')
  }

  if (answer >= 251) {
    res.redirect('/prototypes/08/views/additional-payment/large')
  }
})

// router.all('/views/additional-payment/additional-payment-calculator', (req, res) => {
//   return res.send('Anything??')
// })

module.exports = router
