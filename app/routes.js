const express = require('express')
const router = express.Router()

// Sign out clears session storage and goes back to start
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('start')
})

// Branching
router.post('/04/eligibility/uc-credit-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let onUc = req.session.data['on-uc']

  if (onUc === 'false') {
    res.redirect('/04/eligibility/off-uc')
  } else {
    res.redirect('/04/eligibility/on-uc')
  }
})


// Add your routes above the module.exports line
module.exports = router
