// Get todays date
var d = new Date();

// Day
var day = d.getDate();

// Month
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var d = new Date();
var n = month[d.getMonth()];
document.getElementById("get-month").innerHTML = n;

// Year
var year = d.getFullYear();

//Time
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

// Display
document.getElementById("get-day").innerHTML = day;
document.getElementById("get-year").innerHTML = year;
document.getElementById("get-hours").innerHTML = hours;
document.getElementById("get-minutes").innerHTML = minutes;
document.getElementById("get-seconds").innerHTML = seconds;
