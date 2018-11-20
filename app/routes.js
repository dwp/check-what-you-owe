const express = require('express')
const router = express.Router()

// Sign out clears session storage and goes back to start
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('start')
})

// Example routes

// Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})


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
router.post('/07/repayment-plan/initial-payment-answer', function (req, res) {
  let InitialPayment = req.session.data['initial-payment']

  if (InitialPayment === 'false') {
    res.redirect('/07/repayment-plan/initial-payment-amount')
  } else {
    res.redirect('/07/repayment-plan/what-is-your-take-home-pay')
  }
})

// Branching for eligibility questions on 05 prototype
router.post('/07/repayment-plan/what-is-your-take-home-pay-answer', function (req, res) {
  let TakeHomePay = req.session.data['take-home-pay']

  if (TakeHomePay === 'take-home-pay-1') {
    res.redirect('/07/repayment-plan/how-much-1')
  }
  if (TakeHomePay === 'take-home-pay-2') {
    res.redirect('/07/repayment-plan/how-much-2')
  }
  if (TakeHomePay === 'take-home-pay-3') {
    res.redirect('/07/repayment-plan/how-much-3')
  }
})

// Add your routes above the module.exports line
module.exports = router
