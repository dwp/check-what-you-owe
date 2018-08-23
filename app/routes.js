const express = require('express')
const router = express.Router()





// Sign out clears session storage and goes back to start
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('start')
})





// Add your routes above the module.exports line
module.exports = router
