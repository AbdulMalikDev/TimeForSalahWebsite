let express = require("express");
const moment = require("moment")
const fetch = require('node-fetch');
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); //using body-parser
app.use(express.static("public"));
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
const {praynow, newarr} = require("./prayerfunction")
var geoTz = require('geo-tz')
require("./prayerfunction")
const prayTimes = require("./public/PPrayTimes")
const countriesjson = require("all-countries-and-cities-json")
const cityjson = require("cities.json")
const path = require('path')
let allcountriesq = []
let allcitiesq = []
let counters = 0
let chapter = 1

Object.entries(countriesjson).forEach(([key, value]) => {
  
  allcountriesq.push(key)

});
Object.entries(cityjson).forEach(([key, value]) => {
 
  allcitiesq.push(value.name)
  
});

let allcountries = [...new Set(allcountriesq)]
let allcities = [...new Set(allcitiesq)]
console.log(allcountries.length + allcities.length)

//console.log(allcities.length)

// const geocoder = require('offline-geocoder')({ database: './data/geodata.db' })

// geocoder.reverse(41.89, 12.49)
//   .then(function(result) {
//     console.log(result)
//   })
//   .catch(function(error) {
//     console.error(error)
//   })




app.get("/month",  (req, res) => {

  let cityname = undefined
  var ipu = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let arr = ipu.split(",")
    let ip = arr[0]
    if(ip === "::1" || "::ffff:127.0.0.1"){ ip = "103.48.68.18" }

    fetch(`https://ipapi.co/${ip}/json/`,{
               method:"get",
               headers: {
                Accept: 'application/json',
              }
             }).then(data => data.json()).then(async e => { 
               
               var location = `${e.region} , ${e.city} , ${e.country_name}`


               if(req.query.latitude && req.query.longitude){
                e.latitude = req.query.latitude
                e.longitude = req.query.longitude
                const json = await fetch(`https://dev.virtualearth.net/REST/v1/Locations/${req.query.latitude}`+","+`${req.query.longitude}?includeEntityTypes=Address,Neighborhood,PopulatedPlace,Postcode1,AdminDivision1,AdminDivision2,CountryRegion&includeNeighborhood=1&key=${process.env.VirtualEarthApiKey}`)
                const data = await json.json() 
                if(data.resourceSets[0].resources[0]){
                  cityname = `${data.resourceSets[0].resources[0].address.countryRegion}`
                  if(data.resourceSets[0].resources[0].address.adminDistrict2 ){ 
                  location = `${data.resourceSets[0].resources[0].address.adminDistrict2} , ${data.resourceSets[0].resources[0].address.countryRegion}`
                  }else{location = `${data.resourceSets[0].resources[0].address.countryRegion}`}
                  
                }
                
              }

              //console.log(e.latitude,e.longitude)
              
              let prayerMethod = undefined
              let asrMethod = undefined
              const timezone = await geoTz(e.latitude,e.longitude)
              if(req.query.asrMethod){asrMethod = parseInt(req.query.asrMethod)}
              if(req.query.prayerMethod){prayerMethod = parseInt(req.query.prayerMethod)}
              
              const arr = praynow(e,timezone,prayerMethod,asrMethod)
              const candy = newarr(e,timezone)
              console.log(cityname)
              
              res.render("monthpage",{namaz:arr,location,candy,timezone,cityname,GoogleAnalyticsId:process.env.GoogleAnalyticsId,AdId:process.env.data-ad-client})
                 
             })
  
  
  
});

app.get("/day" , (req,res) => {


  console.log("in /day")
  let cityname = undefined
  var ipu = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let arr = ipu.split(",")
    let ip = arr[0] 
    console.log(ip)
    //if(ip === "::1" || "::ffff:127.0.0.1"){ ip = `something`;console.log("You are on local server") }
    console.log("THIS IS MY IP",ip)
    //let ip = "172.98.73.39" 
    fetch(`https://ipapi.co/${ip}/json/`,{
               method:"get",
               headers: {
                Accept: 'application/json',
              }
             }).then(data => data.json()).then(async e => { 
               
               var location = `${e.region} , ${e.city} , ${e.country_name}`


               if(req.query.latitude && req.query.longitude){
                e.latitude = req.query.latitude
                e.longitude = req.query.longitude
                var url = `https://dev.virtualearth.net/REST/v1/Locations/${req.query.latitude}`+","+`${req.query.longitude}?includeEntityTypes=Address,Neighborhood,PopulatedPlace,Postcode1,AdminDivision1,AdminDivision2,CountryRegion&includeNeighborhood=1&key=${process.env.VirtualEarthApiKey}`
                console.log(url)
                const json = await fetch(url)
                const data = await json.json()
                console.log(data)
                if(data.resourceSets[0].resources[0]){
                cityname = `${data.resourceSets[0].resources[0].address.countryRegion}`
                if(data.resourceSets[0].resources[0].address.adminDistrict2 ){ 
                location = `${data.resourceSets[0].resources[0].address.adminDistrict2} , ${data.resourceSets[0].resources[0].address.countryRegion}`
                }else{location = `${data.resourceSets[0].resources[0].address.countryRegion}`}
                
              }}

              //console.log(e.latitude,e.longitude)
              let prayerMethod = undefined
              let asrMethod = undefined
              const timezone = await geoTz(e.latitude,e.longitude)
              if(req.query.asrMethod){asrMethod = parseInt(req.query.asrMethod)}
              if(req.query.prayerMethod){prayerMethod = parseInt(req.query.prayerMethod)}
              const arr = praynow(e,timezone,prayerMethod,asrMethod)
              const candy = newarr(e,timezone)
              //console.log(cityname)
              // console.log(arr,"@@@@@@@@@@@@@@@@")
              
              res.render("daypage",{r:arr[0],location,candy,timezone,cityname,GoogleAnalyticsId:process.env.GoogleAnalyticsId,AdId:process.env.dataadclient,pubid:process.env.PubId,integrity:process.env.Integrity})
                 
             })
  
  
})


app.get("/findingnamaztiming" , async (req,res) => {
        let address = "australia"
        if(req.query.press){
          address = req.query.press
        }
        if(req.query.search){
          address = req.query.search
        }



        const json = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+`.json?access_token=${process.env.MapBoxKey}`)
        const body = await json.json()
        if(body.features.length == 0){

            //write ERROR message

        }else{
        const data = body.features[0]
        const long = data.center[0]
        const lat = data.center[1]
        const location = data.place_name
        console.log(lat,long,location)
        res.redirect(`https://www.timeforsalah.com/day?latitude=${lat}&longitude=${long}`)}
})

app.get("/", async (req,res) => {

  
  // let json = await fetch(`http://staging.quran.com:3000/api/v3/chapters/${chapter}/verses?recitation=1&translations=21&media=23&language=en&page=1&offset=${counters}&limit=43&text_type=words`)
  // let data = await json.json()
  // if(data.verses.length === 0){
  //   counters=0;
  //   chapter = chapter + 1;
  //   console.log("IM IN")
  //    json = await fetch(`http://staging.quran.com:3000/api/v3/chapters/${chapter}/verses?recitation=1&translations=21&media=23&language=en&page=1&offset=${counters}&limit=43&text_type=words`)
  //    data = await json.json()}
  // console.log(chapter)
  
  // const quran = {
  //   verse: data.verses[0].text_indopak,
  //   translation: data.verses[0].translations[0].text
  // }
  // counters = counters + 1
  // console.log(counters)
  // console.log(chapter)
  quran = null;
  chapter = null;
  counters = null;

  res.render("mainpage",{allcountries,allcities,quran,chapter,counters,GoogleAnalyticsId:process.env.GoogleAnalyticsId,AdId:process.env.dataadclient})
})



app.get("/allcountries", async (req,res) => {

  res.render("allcountries",{allcountries,allcities,allcountrieskestates:undefined,quran:undefined})
})

app.get("/city", async (req,res) => {
  let name= ""
  console.log(req.query.name)
  if(req.query.name){
    Object.entries(countriesjson).forEach(([key, value]) => {
      console.log("e",key, req.query.name)
      if(req.query.name.trim() == key){
        
        res.render("allcountries",{allcountrieskestates: value , allcountries: undefined, quran:undefined})
      }
      
    });
  }

  
})

app.get("/verse",async function(req, res) {
  let json = await fetch(`http://staging.quran.com:3000/api/v3/chapters/${req.query.chapter}/verses?recitation=1&translations=21&media=23&language=en&page=1&offset=${req.query.counters}&limit=43&text_type=words`)
  let data = await json.json()
  const quran = {
    verse: data.verses[0].text_indopak,
    translation: data.verses[0].translations[0].text
  }



  res.render("allcountries",{allcountrieskestates: undefined, allcountries: undefined , quran})
});


app.get("/sitemap.xml", function(req, res) {
  res.sendFile(path.join(__dirname + "/sitemap.xml"));
});

app.get("/Robots.txt", function(req, res) {
  res.sendFile(path.join(__dirname + "/Robots.txt"));
});


app.listen(port, () => {
    console.log("server is running on "+port);
  });