const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {

  const city = req.body.cityName;
  const apikey = "74ba8643ae59d707d49d092dace8fd84";
  const unit = "metric";
  https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>Temp in " + city + " is " + temp + " degree celcius</h1>");
      res.write("<p>The weather discription is " + weatherDiscription + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
})

app.listen(3000, function () {
  console.log("Server running in the port 3000.");
})
