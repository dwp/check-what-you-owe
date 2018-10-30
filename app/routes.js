const express = require('express')
const router = express.Router()

// Sign out clears session storage and goes back to start
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('start')
})

// Branching
router.post('/examples/branching/over-18-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let over18 = req.session.data['over-18']

  if (over18 === 'false') {
    res.redirect('/docs/examples/branching/under-18')
  } else {
    res.redirect('/docs/examples/branching/over-18')
  }
})

// Add your routes above the module.exports line
module.exports = router
