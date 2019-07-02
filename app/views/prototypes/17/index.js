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

// Additional payment routing
//
//
//

// Repayment plan amount - route depending on amount inputted
router.post('/views/repayment-plan/repayment-amount', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 10) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-calculator/small')
  }

  if (answer >= 11) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-calculator/large')
  }
})

// Making an additional payment
router.post('/views/repayment-plan/repayment-calculator/small', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 10) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-calculator/small')
  }

  if (answer >= 11) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-calculator/large')
  }
})

// Repayment plan routing
//
//
//

// Branch users to make an initial payment or just setup direct debit
router.post('/views/repayment-plan/what-do-you-want-to-do', function (req, res) {
  const submitted = req.session.data;

  if (submitted['initial-payment'] === 'false') {
    res.redirect('/prototypes/17/views/repayment-plan/initial-payment-amount')
  }

  if (submitted['initial-payment'] === 'true') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-amount')
  }
})

// Branch users to lump sum or repayment plan only
router.post('/views/repayment-plan/initial-payment', function (req, res) {
  const submitted = req.session.data;

  if (submitted['initial-payment'] === 'true') {
    res.redirect('/prototypes/17/views/repayment-plan/initial-payment-amount')
  }

  if (submitted['initial-payment'] === 'false') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-plan-summary')
  }
})

// Branch users to lump sum or repayment plan only
router.post('/views/repayment-plan/initial-payment-amount', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 999999999999) {
    res.redirect('/prototypes/17/views/repayment-plan/initial-payment-summary')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 9) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }

  if (answer >= 10) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-plan-summary')
  }

})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 9) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-amount-result/amount-too-low--monthly-lump-sum')
  }

  if (answer >= 10) {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-plan-summary/monthly')
  }

})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--monthly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-plan-summary')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-plan-summary/monthly')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/17/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }
})


module.exports = router
