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

// Making an additional payment
router.post('/views/additional-payments/additional-payment/additional-payment-calculator', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['additional-payment'] || 0)

  if (answer <= 100) {
    res.redirect('/prototypes/10/views/additional-payments/additional-payment/small')
  }

  if (answer <= 250) {
    res.redirect('/prototypes/10/views/additional-payments/additional-payment/medium')
  }

  if (answer >= 251) {
    res.redirect('/prototypes/10/views/additional-payments/additional-payment/large')
  }
})


// Repayment plan routing
//
//
//

// Branch users to lump sum or repayment plan only
router.post('/views/repayment-plan/initial-payment', function (req, res) {
  const submitted = req.session.data;

  if (submitted['initial-payment'] === 'false') {
    res.redirect('/prototypes/10/views/repayment-plan/initial-payment-amount')
  }

  if (submitted['initial-payment'] === 'true') {
    res.redirect('/prototypes/10/views/repayment-plan/what-is-your-take-home-pay/no-lump-sum')
  }
})

// Branch users to lump sum or repayment plan only
router.post('/views/repayment-plan/initial-payment-amount', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 999999999999) {
    res.redirect('/prototypes/10/views/repayment-plan/what-is-your-take-home-pay/lump-sum')
  }
})

// Hiding this as radio buttons aren't as user friendly as a free text field

// // No lump sum what is your take home pay using radio buttons
// router.post('/views/repayment-plan/what-is-your-take-home-pay/no-lump-sum', function (req, res) {
//   const submitted = req.session.data;
//
//   if (submitted['take-home-pay'] === 'take-home-pay-1') {
//     res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency')
//   }
//
//   if (submitted['take-home-pay'] === 'take-home-pay-2') {
//     res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency')
//   }
//
//   if (submitted['take-home-pay'] === 'take-home-pay-3') {
//     res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency')
//   }
//
//   if (submitted['take-home-pay'] === 'take-home-pay-4') {
//     res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency')
//   }
//
//   if (submitted['take-home-pay'] === 'take-home-pay-5') {
//     res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency')
//   }
// })

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/what-is-your-take-home-pay/no-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 9999999999) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/monthly')
  }
})

// Lump sum what is your take home pay
router.post('/views/repayment-plan/what-is-your-take-home-pay/lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['take-home-pay'] === 'take-home-pay-1') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-2') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-3') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-4') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency-lump-sum')
  }

  if (submitted['take-home-pay'] === 'take-home-pay-5') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-frequency-lump-sum')
  }
})


// Send user to monthly, weekly or fortnightly branch
router.post('/views/repayment-plan/repayment-frequency', function (req, res) {
  const submitted = req.session.data;

  if (submitted['payment-frequency'] === 'monthly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/monthly')
  }

  if (submitted['payment-frequency'] === 'fortnightly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/fortnightly')
  }

  if (submitted['payment-frequency'] === 'weekly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/weekly')
  }
})

// Send user to monthly, weekly or fortnightly branch after entering a lump sum
router.post('/views/repayment-plan/repayment-frequency-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['payment-frequency'] === 'monthly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/monthly-lump-sum')
  }

  if (submitted['payment-frequency'] === 'fortnightly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/fortnightly-lump-sum')
  }

  if (submitted['payment-frequency'] === 'weekly') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount/weekly-lump-sum')
  }
})


// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/monthly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 49) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--monthly')
  }

  if (answer <= 74) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly')
  }

  if (answer >= 75) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--monthly')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 49) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--monthly-lump-sum')
  }

  if (answer <= 74) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly-lump-sum')
  }

  if (answer >= 75) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--monthly-lump-sum')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/fortnightly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 24) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--fortnightly')
  }

  if (answer <= 36) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly')
  }

  if (answer >= 37) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--fortnightly')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 24) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--fortnightly-lump-sum')
  }

  if (answer <= 36) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly-lump-sum')
  }

  if (answer >= 37) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--fortnightly-lump-sum')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/weekly', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 11) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--weekly')
  }

  if (answer <= 18) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly')
  }

  if (answer >= 19) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--weekly')
  }
})

// Branch users to different page based on numerical amount
router.post('/views/repayment-plan/repayment-amount/weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  // Format answer as whole number
  const answer = parseFloat(submitted['repayment-amount'] || 0)

  if (answer <= 11) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-low--weekly-lump-sum')
  }

  if (answer <= 18) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly-lump-sum')
  }

  if (answer >= 19) {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/amount-too-high--weekly-lump-sum')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--monthly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--fortnightly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--weekly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--weekly')
  }
})

// Ask users if they can afford £50 after putting in a lower amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-low--weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly-lump-sum--low')
  }

  if (submitted['can-you-pay-50'] === 'can-you-pay-50-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--weekly')
  }
})


// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--monthly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--monthly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/monthly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--monthly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--fortnightly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--fortnightly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/fortnightly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--fortnightly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--weekly', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--weekly')
  }
})

// Ask users if they can afford £75 after putting in a higher amount, send them to the relevant page based on answer.
router.post('/views/repayment-plan/repayment-amount-result/amount-too-high--weekly-lump-sum', function (req, res) {
  const submitted = req.session.data;

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-yes') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-plan-summary/weekly-lump-sum')
  }

  if (submitted['can-you-afford-this'] === 'can-you-afford-this-no') {
    res.redirect('/prototypes/10/views/repayment-plan/repayment-amount-result/contact-us--weekly')
  }
})

module.exports = router
