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

// Check if user is on UC
router.post('/views/eligibility', function (req, res) {
  const submitted = req.session.data;

  if (submitted['universal-credit'] === 'on-uc-yes') {
    res.redirect('/prototypes/05/views/eligibility/on-universal-credit')
  }

  if (submitted['universal-credit'] === 'on-uc-no') {
    res.redirect('/prototypes/05/views/eligibility/off-universal-credit')
  }
})


// Route user to check or repay
router.post('/views/eligibility/off-universal-credit', function (req, res) {
  const submitted = req.session.data;

  if (submitted['what-would-you-like-to-do'] === 'check') {
    res.redirect('/prototypes/05/views/eligibility/check-what-you-owe')
  }

  if (submitted['what-would-you-like-to-do'] === 'repay') {
    res.redirect('/prototypes/05/views/eligibility/pay-what-you-owe')
  }
})


// Route user to check how the user wants to repay
router.post('/views/eligibility/pay-what-you-owe', function (req, res) {
  const submitted = req.session.data;

  if (submitted['repayment-options'] === 'full') {
    res.redirect('/prototypes/05/views/eligibility/pay-what-you-owe-start')
  }

  if (submitted['repayment-options'] === 'partial') {
    res.redirect('/prototypes/05/views/eligibility/partial')
  }

  if (submitted['repayment-options'] === 'plan') {
    res.redirect('/prototypes/05/views/eligibility/plan')
  }
})

module.exports = router
