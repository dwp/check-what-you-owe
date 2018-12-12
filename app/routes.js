const express = require('express')
const fs = require('fs')
const router = express.Router()

// // Add your routes here - above the module.exports line
// router.use(require('./middleware/locals'))
//
// // Data sources
// router.all('/data/:data/source/:source', (req, res) => {
//  const { data, source } = req.params
//  res.json(require(`./data/${data}/source/${source}`))
// })
//
// // Remove trailing slashes
// router.all('\\S+/$', (req, res) => {
//  res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length))
// })
//
// // Find prototypes here
// const search = `${__dirname}/views/prototypes/`
// const prototypes = fs.readdirSync(search).filter(file => {
//  return fs.statSync(`${search}/${file}`).isDirectory()
// })
//
// // Multiple prototypes
// for (const directory of prototypes) {
//  const prototype = require(`${search}${directory}`)
//   // Prototype static assets
//  prototype.use(`/assets`, express.static(`${__dirname}/views/prototypes/${directory}/assets`))
//   // Prototype router
//  router.use(`/${directory}`, prototype)
// }
//
// // Sign out clears session storage and goes back to start
// router.get('/signout', function (req, res) {
//   req.session.destroy()
//   res.redirect('start')
// })

// 05 prototype routing

// Branching for eligibility questions on 05 prototype
router.post('/05/eligibility/universal-credit-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let UniversalCredit = req.session.data['universal-credit']

  if (UniversalCredit === 'false') {
    res.redirect('/05/eligibility/off-universal-credit')
  } else {
    res.redirect('/05/eligibility/on-universal-credit')
  }
})

// Branching for eligibility questions on 05 prototype
router.post('/05/eligibility/what-would-you-like-to-do-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let WhatWouldYouLikeToDo = req.session.data['what-would-you-like-to-do']

  if (WhatWouldYouLikeToDo === 'false') {
    res.redirect('/05/eligibility/check-what-you-owe')
  } else {
    res.redirect('/05/eligibility/pay-what-you-owe')
  }
})

// Branching for eligibility questions on 05 prototype
router.post('/05/eligibility/repayment-answer', function (req, res) {
  let RepaymentOptions = req.session.data['repayment-options']

  if (RepaymentOptions === 'full') {
    res.redirect('/05/eligibility/full')
  }
  if (RepaymentOptions === 'partial') {
    res.redirect('/05/eligibility/partial')
  }
  if (RepaymentOptions === 'plan') {
    res.redirect('/05/eligibility/plan')
  }
})

// 07 prototype routing

// Branch users to lump sum or repayment plan only
router.post('/prototypes/07/views/initial-payment', function (req, res) {
  const submitted = req.session.data;

  if (submitted['initial-payment'] === 'false') {
    res.redirect('/prototypes/07/views/initial-payment-amount')
  }

  if (submitted['initial-payment'] === 'true') {
    res.redirect('/prototypes/07/views/what-is-your-take-home-pay/no-lump-sum')
  }
})

// Branch users to lump sum or repayment plan only
router.post('/prototypes/07/views/initial-payment-amount', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 999999999999) {
    res.redirect('/prototypes/07/views/what-is-your-take-home-pay/lump-sum')
  }
})

// No lump sum what is your take home pay
router.post('/prototypes/07/views/what-is-your-take-home-pay/no-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['take-home-pay'] === 'take-home-pay-1') {
    res.redirect('/prototypes/07/views/repayment-frequency')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-2') {
    res.redirect('/prototypes/07/views/repayment-frequency')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-3') {
    res.redirect('/prototypes/07/views/repayment-frequency')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-4') {
    res.redirect('/prototypes/07/views/repayment-frequency')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-5') {
    res.redirect('/prototypes/07/views/repayment-frequency')
  }
})


// Lump sum what is your take home pay
router.post('/prototypes/07/views/what-is-your-take-home-pay/lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['take-home-pay'] === 'take-home-pay-1') {
    res.redirect('/prototypes/07/views/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-2') {
    res.redirect('/prototypes/07/views/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-3') {
    res.redirect('/prototypes/07/views/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-4') {
    res.redirect('/prototypes/07/views/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-5') {
    res.redirect('/prototypes/07/views/repayment-frequency-lump-sum')
  }
})


// Send user to monthly, weekly or fortnightly branch
router.post('/prototypes/07/views/repayment-frequency', function (req, res) {
  const submitted = req.session.data;

  if (submitted['payment-frequency'] === 'monthly') {
    res.redirect('/prototypes/07/views/repayment-amount/monthly')
  }

  if (submitted['payment-frequency'] === 'fortnightly') {
    res.redirect('/prototypes/07/views/repayment-amount/fortnightly')
  }

  if (submitted['payment-frequency'] === 'weekly') {
    res.redirect('/prototypes/07/views/repayment-amount/weekly')
  }
})

// Send user to monthly, weekly or fortnightly branch after entering a lump sum
router.post('/prototypes/07/views/repayment-frequency-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['payment-frequency'] === 'monthly') {
    res.redirect('/prototypes/07/views/repayment-amount/monthly-lump-sum')
  }

  if (submitted['payment-frequency'] === 'fortnightly') {
    res.redirect('/prototypes/07/views/repayment-amount/fortnightly-lump-sum')
  }

  if (submitted['payment-frequency'] === 'weekly') {
    res.redirect('/prototypes/07/views/repayment-amount/weekly-lump-sum')
  }
})


// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/monthly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 49) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--monthly')
  }

  if (answer <= 74) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly')
  }

  if (answer >= 75) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--monthly')
  }
})

// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 49) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--monthly-lump-sum')
  }

  if (answer <= 74) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly-lump-sum')
  }

  if (answer >= 75) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--monthly-lump-sum')
  }
})

// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/fortnightly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 24) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--fortnightly')
  }

  if (answer <= 36) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly')
  }

  if (answer >= 37) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--fortnightly')
  }
})

// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 24) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--fortnightly-lump-sum')
  }

  if (answer <= 36) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly-lump-sum')
  }

  if (answer >= 37) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--fortnightly-lump-sum')
  }
})

// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/weekly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 11) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--weekly')
  }

  if (answer <= 18) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly')
  }

  if (answer >= 19) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--weekly')
  }
})

// Branch users to different page based on numerical amount
router.post('/prototypes/07/views/repayment-amount/weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 11) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-low--weekly-lump-sum')
  }

  if (answer <= 18) {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly-lump-sum')
  }

  if (answer >= 19) {
    res.redirect('/prototypes/07/views/repayment-amount-result/amount-too-high--weekly-lump-sum')
  }
})


// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--monthly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--fortnightly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--weekly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--weekly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-low--weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--weekly')
  }
})


// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--monthly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/monthly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--fortnightly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/fortnightly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--weekly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--weekly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/prototypes/07/views/repayment-amount-result/amount-too-high--weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/07/views/repayment-plan-summary/weekly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/07/views/repayment-amount-result/contact-us--weekly')
  }
})

// 08 prototype routing

// Making an addition payment
router.post('/prototypes/08/views/additional-payment/additional-payment-calculator', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['additional-payment'] || 0)

  if (answer <= 100) {
    res.redirect('/prototypes/08/views/additional-payment/test-1')
  }

  if (answer <= 250) {
    res.redirect('/prototypes/08/views/additional-payment/test-2')
  }

  if (answer >= 251) {
    res.redirect('/prototypes/08/views/additional-payment/test-3')
  }
})


module.exports = router
