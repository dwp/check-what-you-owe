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

// Branching
router.post('/04/eligibility/universal-credit-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let UniversalCredit = req.session.data['universal-credit']

  if (UniversalCredit === 'false') {
    res.redirect('/04/eligibility/off-universal-credit')
  } else {
    res.redirect('/04/eligibility/on-universal-credit')
  }
})

// Branching
router.post('/04/eligibility/what-would-you-like-to-do-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let WhatWouldYouLikeToDo = req.session.data['what-would-you-like-to-do']

  if (WhatWouldYouLikeToDo === 'false') {
    res.redirect('/04/eligibility/check-what-you-owe')
  } else {
    res.redirect('/04/eligibility/pay-what-you-owe')
  }
})

// Branching
router.post('/04/eligibility/repayment-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let RepaymentOptions = req.session.data['repayment-options']

  if (RepaymentOptions === 'full') {
    res.redirect('/04/eligibility/full')
  }
  if (RepaymentOptions === 'partial') {
    res.redirect('/04/eligibility/partial')
  }
  if (RepaymentOptions === 'plan') {
    res.redirect('/04/eligibility/plan')
  }
})





// Add your routes above the module.exports line
module.exports = router
