const express = require('express')
const requireDir = require('require-dir')
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

// Branching for 07 repayment plan
router.post('/prototypes/07/views/initial-payment', function (req, res) {
  const submitted = req.session.data;

  if (submitted['initial-payment'] === 'false') {
    res.redirect('/prototypes/07/views/initial-payment-amount')
  }

  if (submitted['initial-payment'] === 'true') {
    res.redirect('/prototypes/07/views/take-home-pay/no-lump-sum')
  }
})

// Branching for 07 repayment plan
router.post('/prototypes/07/views/take-home-pay/what-is-your-take-home-pay--no-lump-sum-answer', function (req, res) {
  let TakeHomePay = req.session.data['take-home-pay']

  if (TakeHomePay === 'take-home-pay-1') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-1--no-lump-sum')
  }
  if (TakeHomePay === 'take-home-pay-2') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-2--no-lump-sum')
  }
  if (TakeHomePay === 'take-home-pay-3') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-3--no-lump-sum')
  }
})


// Branching for 07 repayment plan
router.post('/prototypes/07/views/take-home-pay/what-is-your-take-home-pay--lump-sum-answer', function (req, res) {
  let TakeHomePay = req.session.data['take-home-pay']

  if (TakeHomePay === 'take-home-pay-1') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-1--lump-sum')
  }
  if (TakeHomePay === 'take-home-pay-2') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-2--lump-sum')
  }
  if (TakeHomePay === 'take-home-pay-3') {
    res.redirect('/prototypes/07/views/how-much-do-you-want-to-repay/take-home-pay-3--lump-sum')
  }
})


module.exports = router
