var adhan = require('adhan')
const moment = require("moment-timezone")
var geoTz = require('geo-tz') 
const lat = 17.4055471
//const lat = 23.8103

const long = 78.4128823
//const long = 90.4125
const timezone = geoTz(lat,long)
console.log(timezone)

const thing = moment().tz(`${timezone}`).format("dddd, MMMM Do YYYY, h:mm:ss a")
console.log(thing)
const things = moment().tz(`${timezone}`).format("Z")
let lesse = things.replace(":",".")
lesse = lesse.replace("+","")
lesse = parseFloat(lesse)
//lesse = 5.365277777777778
//lesse = 5.30

var date = new Date();
var coordinates = new adhan.Coordinates(lat, long);
var params = adhan.CalculationMethod.Karachi();
params.madhab = adhan.Madhab.Hanafi;
//params.adjustments.fajr = 2;
params.highLatitudeRule = 3
//params.fajrAngle = 18
var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
var formattedTime = adhan.Date.formattedTime;
console.log('Fajr: ' + formattedTime(prayerTimes.fajr, lesse) + '\n');
console.log('Sunrise: ' + formattedTime(prayerTimes.sunrise, lesse) + '\n');
console.log('Dhuhr: ' + formattedTime(prayerTimes.dhuhr, lesse) + '\n');
console.log('Asr: ' + formattedTime(prayerTimes.asr, lesse) + '\n');
console.log('Maghrib: ' + formattedTime(prayerTimes.maghrib, lesse) + '\n');
console.log('Isha: ' + formattedTime(prayerTimes.isha, lesse) + '\n');

// console.log(moment().tz(`${timezone}`).toDate())
// console.log(new Date(moment().tz(`${timezone}`).toISOString()))