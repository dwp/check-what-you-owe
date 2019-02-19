const express = require('express')
const fs = require('fs')
const router = express.Router()
const {format} = require('date-fns') // ------------------ Require format function from date-fns



// Create a new middleware function.
// This makes it run on every page load in the application
router.use('/', (req, res, next) => {
  // Get todays date as a JS date
  const today = new Date()

  // Set a local (a variable available in the .html files) using the format function from date-fns
  res.locals.todayDateFNS = format(today, 'D MMMM YYYY - HH:mm:ss')

  // Set a local (a variable available in the .html files) using the format function from date-fns
  res.locals.currentMonth = format(today, 'MMMM')

  // Set a local (a variable available in the .html files) using the format function from date-fns
  res.locals.currentYear = format(today, 'YYYY')

  // Tell express we are done with this middleware function
  next()
})

// Add your routes here - above the module.exports line
router.use(require('./middleware/locals'))

// Data sources
router.all('/data/:data/source/:source', (req, res) => {
 const { data, source } = req.params
 res.json(require(`./data/${data}/source/${source}`))
})

// Remove trailing slashes
router.all('\\S+/$', (req, res) => {
 res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length))
})

// Find prototypes here
const search = `${__dirname}/views/prototypes/`
const prototypes = fs.readdirSync(search).filter(file => {
 return fs.statSync(`${search}/${file}`).isDirectory()
})

// Multiple prototypes
for (const directory of prototypes) {
  const prototype = require(`${search}${directory}`)

  // Prototype static assets
  prototype.use(`/assets`, express.static(`${__dirname}/views/prototypes/${directory}/assets`))

  // Prototype router
  router.use(`/prototypes/${directory}`, prototype)
}

// Sign out clears session storage and goes back to start
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('start')
})

module.exports = router
