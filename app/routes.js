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
  res.locals.todayDateFNS = format(today, 'D MMMM YYYY - hh:mm:ss')

  // Set a local (a variable available in the .html files) using the format function from date-fns
  res.locals.currentMonthFNS = format(today, 'MMMM')

  // Set a local (a variable available in the .html files) using the format function from date-fns
  res.locals.currentYearFNS = format(today, 'YYYY')

  // Tell express we are done with this middleware function
  next()
})



// Create a new middleware function.
// This makes it run on every page load in the application
router.use('/', (req, res, next) => {
  // Get todays date as a JS date
  const today = new Date();

  // Get the day from the today variable
  const day = today.getDate();

  // Create an array of months as words
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  // Get the month in words from the months array
  // by using the month as a number from the today variable
  const month = months[today.getMonth()];

  // Get the year from the today variable
  const year = today.getFullYear();

  // Create the time using the hours, minutes and seconds from the today variable
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  // Set a local (a variable available in the .html files) using the variables we just created
  res.locals.todayDateJS = `${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`

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
