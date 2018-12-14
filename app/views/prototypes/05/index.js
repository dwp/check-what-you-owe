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

// checking whether user is in UC
router.post('/prototypes/05/views/eligibility', function (req, res) {
  const submitted = req.session.data;

  if (submitted['universal-credit'] === 'on-uc-yes') {
    res.redirect('/prototypes/05/views/eligibility/on-universal-credit')
  }

  if (submitted['universal-credit'] === 'on-uc-no') {
    res.redirect('/prototypes/05/views/eligibility/off-universal-credit')
  }
})

// Branching for eligibility questions on 05 prototype
router.post('prototypes/05/views/eligibility/what-would-you-like-to-do-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let WhatWouldYouLikeToDo = req.session.data['what-would-you-like-to-do']

  if (WhatWouldYouLikeToDo === 'false') {
    res.redirect('prototypes/05/views/eligibility/check-what-you-owe')
  } else {
    res.redirect('prototypes/05/views/eligibility/pay-what-you-owe')
  }
})

// Branching for eligibility questions on 05 prototype
router.post('prototypes/05/views/eligibility/repayment-answer', function (req, res) {
  let RepaymentOptions = req.session.data['repayment-options']

  if (RepaymentOptions === 'full') {
    res.redirect('prototypes/05/views/eligibility/full')
  }
  if (RepaymentOptions === 'partial') {
    res.redirect('prototypes/05/views/eligibility/partial')
  }
  if (RepaymentOptions === 'plan') {
    res.redirect('prototypes/05/views/eligibility/plan')
  }
})

module.exports = router
