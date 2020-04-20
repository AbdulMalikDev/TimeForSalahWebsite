const prayTimes = require("./public/PPrayTimes")     
const moment = require("moment-timezone")
//console.log(moment().tz("America/Los_Angeles").format()); 
var geoTz = require('geo-tz')  
var adhan = require('adhan')
let method = "Hanafi"




// var newdate = moment().tz(`${timezone}`).format("dddd, MMMM Do YYYY, h:mm:ss a")

              
const praynow =  (e,timezone , prayerMethod, asrMethod) => {
    
                const things = moment().tz(`${timezone}`).format("Z")
                let lesse = things.replace(":",".")
                lesse = lesse.replace("+","")
                lesse = parseFloat(lesse)
                //console.log(`${timezone}`)
                var params = undefined
                
                //console.log(prayerMethod,asrMethod,"%%%%%%%%%%%%%%")
                switch(prayerMethod){
                    case 0:
                        params = adhan.CalculationMethod.MuslimWorldLeague()
                        break
                    case 1:
                        params = adhan.CalculationMethod.Egyptian()
                        break
                    case 2:
                        params = adhan.CalculationMethod.Karachi()
                        break
                    case 3:
                        params = adhan.CalculationMethod.UmmAlQura()

                        console.log("IIIIIIIINNNNNNNN")
                        break
                    case 4:
                        params = adhan.CalculationMethod.Dubai()
                        break
                    case 5:
                        params = adhan.CalculationMethod.Qatar()
                        break
                    case 6:
                        params = adhan.CalculationMethod.Kuwait()
                        break
                    case 7:
                        params = adhan.CalculationMethod.MoonsightingCommittee()
                        break
                    case 8:
                        params = adhan.CalculationMethod.Singapore()
                        break
                    case 9:
                        params = adhan.CalculationMethod.NorthAmerica()
                        break
                    default:
                        params = adhan.CalculationMethod.Karachi()
                    
                }

            

                params.madhab = undefined

                switch(asrMethod){
                    case 0:
                         params.madhab = adhan.Madhab.Shafi;
                        break
                    case 1:
                         params.madhab = adhan.Madhab.Hanafi;
                        break
                    default:
                        params.madhab = adhan.Madhab.Hanafi;

                }

                console.log(params)

                


                
                //params.madhab = adhan.Madhab.Hanafi;
                
                // if (["Asia/Riyadh", "Europe/Madrid" , "Asia/Shanghai", "Asia/Qatar" , "Australia/Melbourne","Australia/Brisbane"].some(a => a === `${timezone}`)) {

                //     method = "Shafi"
                // }else{
                //     method = "Hanafi"
                // }
                // params.madhab = adhan.Madhab[method]

                if(`${timezone}` === "Asia/Kolkata")
                {
                    params.adjustments.fajr = 12;
                    params.adjustments.sunrise = 12;
                    params.adjustments.dhuhr = 12;
                    params.adjustments.asr = 12;
                    params.adjustments.maghrib = 12;
                    params.adjustments.isha = 12;

                }

                if(`${timezone}` === "America/Toronto")
                {
                    params.adjustments.fajr = 16;
                    params.adjustments.isha = -16;

                }

                if(`${timezone}` === "Asia/Qatar")
                {
                    
                    params.adjustments.isha = 15;

                }

              let arr = []
              var date = moment().tz(`${timezone}`);
              //console.log(date.format())
              var prayerdate = moment().tz(`${timezone}`).toDate() //specifically for getTimes function
              var dated = moment([date.year(), date.month(), 1]); // today
              var enddate = date.add(1,'M');
              while(dated<enddate){
                var coordinates = new adhan.Coordinates(e.latitude,e.longitude);
                var prayerTimes = new adhan.PrayerTimes(coordinates, prayerdate, params);
                var formattedTime = adhan.Date.formattedTime;

              var times =  {
                  fajr: formattedTime(prayerTimes.fajr, lesse),
                  sunrise: formattedTime(prayerTimes.sunrise, lesse),
                  zuhar: formattedTime(prayerTimes.dhuhr, lesse),
                  asr: formattedTime(prayerTimes.asr, lesse),
                  maghrib: formattedTime(prayerTimes.maghrib, lesse),
                  isha: formattedTime(prayerTimes.isha, lesse)
              }
              times.date = moment(prayerdate).format("MMM Do ");
              console.log(times,"3333333333333")
              arr.push(times)
              
              prayerdate.setDate(prayerdate.getDate() + 1) //specifically for getTimes function
              //console.log(times,"PRAYER TIMING NEW" )
              dated.add(1,'d');}
              //console.log(arr[0])
              
              return arr;
};

const newarr = (e,timezone , prayerMethod, asrMethod) => {
    const things = moment().tz(`${timezone}`).format("Z")
    let lesse = things.replace(":",".")
    lesse = lesse.replace("+","")
    lesse = parseFloat(lesse)
    //console.log(`${timezone}`)


    var params = undefined
                
                //console.log(prayerMethod,asrMethod,"%%%%%%%%%%%%%%")
                switch(prayerMethod){
                    case 0:
                        params = adhan.CalculationMethod.MuslimWorldLeague()
                        break
                    case 1:
                        params = adhan.CalculationMethod.Egyptian()
                        break
                    case 2:
                        params = adhan.CalculationMethod.Karachi()
                        break
                    case 3:
                        params = adhan.CalculationMethod.UmmAlQura()

                        console.log("IIIIIIIINNNNNNNN")
                        break
                    case 4:
                        params = adhan.CalculationMethod.Dubai()
                        break
                    case 5:
                        params = adhan.CalculationMethod.Qatar()
                        break
                    case 6:
                        params = adhan.CalculationMethod.Kuwait()
                        break
                    case 7:
                        params = adhan.CalculationMethod.MoonsightingCommittee()
                        break
                    case 8:
                        params = adhan.CalculationMethod.Singapore()
                        break
                    case 9:
                        params = adhan.CalculationMethod.NorthAmerica()
                        break
                    default:
                        params = adhan.CalculationMethod.Karachi()
                    
                }

            

                params.madhab = undefined

                switch(asrMethod){
                    case 0:
                         params.madhab = adhan.Madhab.Shafi;
                        break
                    case 1:
                         params.madhab = adhan.Madhab.Hanafi;
                        break
                    default:
                        params.madhab = adhan.Madhab.Hanafi;

                }



    
    //params.madhab = adhan.Madhab.Hanafi;
    if(`${timezone}` === "Asia/Riyadh"){params = adhan.CalculationMethod.UmmAlQura()}
    // if (["Asia/Riyadh", "Europe/Madrid" , "Asia/Shanghai", "Asia/Qatar" , "Australia/Melbourne","Australia/Brisbane"].some(a => a === `${timezone}`)) {

    //     method = "Shafi"
    // }else{
    //     method = "Hanafi"
    // }
    //params.madhab = adhan.Madhab[method]

    if(`${timezone}` === "Asia/Kolkata")
    {
        params.adjustments.fajr = 12;
        params.adjustments.sunrise = 12;
        params.adjustments.dhuhr = 12;
        params.adjustments.asr = 12;
        params.adjustments.maghrib = 12;
        params.adjustments.isha = 12;

    }

    if(`${timezone}` === "America/Toronto")
    {
        params.adjustments.fajr = 16;
        params.adjustments.isha = -16;

    }

    if(`${timezone}` === "Asia/Qatar")
    {
        
        params.adjustments.isha = 15;

    }

  let arr = []
  var date = moment().tz(`${timezone}`);
  //console.log(date.format())
  var prayerdate = moment().tz(`${timezone}`).toDate() //specifically for getTimes function
  var dated = moment([date.year(), date.month(), 1]); // today
  var enddate = date.add(1,'M');
  while(dated<enddate){
    var coordinates = new adhan.Coordinates(e.latitude,e.longitude);
    var prayerTimes = new adhan.PrayerTimes(coordinates, prayerdate, params);
    var formattedTime = adhan.Date.formattedTime;

  var times =  {
      fajr: formattedTime(prayerTimes.fajr, lesse,'24h'),
      sunrise: formattedTime(prayerTimes.sunrise, lesse,'24h'),
      zuhar: formattedTime(prayerTimes.dhuhr, lesse,'24h'),
      asr: formattedTime(prayerTimes.asr, lesse,'24h'),
      maghrib: formattedTime(prayerTimes.maghrib, lesse,'24h'),
      isha: formattedTime(prayerTimes.isha, lesse,'24h')
  }
  times.date = moment(prayerdate).format("MMM Do ");
  arr.push(times)
  
  prayerdate.setDate(prayerdate.getDate() + 1) //specifically for getTimes function
  //console.log(times,"PRAYER TIMING NEW" )
  dated.add(1,'d');}
  //console.log(arr[0])
  return arr;
                        };



module.exports = {praynow,newarr}