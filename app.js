//time and date
const showtime = document.getElementById("js--time")
const showdate = document.getElementById("js--date")

function displayDateTime() {
    let now = new Date();
    let date = now.toDateString();
    let time = now.toLocaleTimeString();
    showtime.innerText = time;
    showdate.innerText = date;
}

setInterval(displayDateTime, 1000);

//weather
const url = 'https://api.weatherapi.com/v1/forecast.json?key=916502f3e59140c4afc85345232303&q=Amsterdam&days=7';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const forecast = data.forecast.forecastday;
    forecast.forEach(day => {
      const date = day.date;
      const condition = day.day.condition.text;
      console.log(`On ${date}: ${condition}`);
    });
  });