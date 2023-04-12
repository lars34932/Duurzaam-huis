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
const daysOfWeek = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

const conditionEmojiMap = {
  'Sunny': '☀️',
  'Clear': '☀️',
  'Partly cloudy': '⛅️',
  'Cloudy': '☁️',
  'Overcast': '☁️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Light rain': '🌧️',
  'Moderate rain': '🌧️',
  'Heavy rain': '🌧️',
  'Patchy rain possible': '🌦️',
  'Patchy snow possible': '🌨️',
  'Patchy sleet possible': '🌨️',
  'Patchy freezing drizzle possible': '🌨️',
  'Thundery outbreaks possible': '⛈️',
};

fetch("https://api.weatherapi.com/v1/forecast.json?key=0779b378ed5a455db0b124708231004&q=Amsterdam&days=7")
  .then(response => response.json())
  .then(data => {
    const forecast = data.forecast.forecastday;
    forecast.forEach((day, index) => {
      //buiten-temperature
      const temp = data.current.temp_c;
      const feelsLike = data.current.feelslike_c;
      document.getElementById('buiten-temp').textContent = 'temperatuur: ' + temp + ' °C';
      document.getElementById('gevoel-buiten-temp').textContent = 'voelt als: ' + feelsLike + ' °C';

      //weather
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const condition = day.day.condition.text;
      const tempC = day.day.avgtemp_c;
      const emoji = conditionEmojiMap[condition] || '❓';
      const elementId = `weer${index + 1}`;
      const element = document.getElementById(elementId);

      //zonsopkomst en ondergang
      const currentAstro = data.forecast.forecastday[0].astro;
      const zonsopkomst = currentAstro.sunrise;
      const zonsondergang = currentAstro.sunset;

      const euzonsopkomst = new Date(`2023-04-10 ${zonsopkomst}`).toLocaleString('nl-NL', { hour: 'numeric', minute: 'numeric', hour12: false });
      const euzonsondergang = new Date(`2023-04-10 ${zonsondergang}`).toLocaleString('nl-NL', { hour: 'numeric', minute: 'numeric', hour12: false });

      document.getElementById("zonsopkomst").textContent = "opkomst: " + euzonsopkomst;
      document.getElementById("zonsondergang").textContent = "ondergang: " + euzonsondergang;

      if (element) {
        element.textContent = `${dayOfWeek} ${emoji} ${tempC}°C`;
      }
    });
  });

//line chart

const labels = [
  "01-04-2023",
  "02-04-2023",
  "03-04-2023",
  "04-04-2023",
  "05-04-2023",
  "06-04-2023",
  "07-04-2023",
  "08-04-2023",
  "09-04-2023",
  "10-04-2023",
  "11-04-2023",
  "12-04-2023",
  "13-04-2023",
  "14-04-2023",
  "15-04-2023",
  "16-04-2023",
  "17-04-2023",
  "18-04-2023",
  "19-04-2023",
  "20-04-2023",
  "21-04-2023",
  "22-04-2023",
  "23-04-2023",
  "24-04-2023",
  "25-04-2023",
  "26-04-2023",
  "27-04-2023",
  "28-04-2023",
  "29-04-2023",
  "30-04-2023",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Stroomverbruik in kWh",
      data: [8.079777, 8.137023, 7.342858, 7.053496, 7.270503, 7.100186, 7.303998, 8.019138, 7.758457, 7.375831, 6.963016, 6.94666, 6.647699, 6.722635, 7.416199, 7.416199, 7.035284, 6.676003, 6.303382, 6.223864, 6.255561, 6.188339, 6.830834, 6.592309, 6.253589, 5.979423, 5.981221, 6.702422, 6.401808, 6.810389, 6.827731],
      borderColor: 'rgb(75, 192, 192)',
    }
  ]
}

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}

const chart1 = new Chart(document.getElementById("js--chart--1"), config);

function readTemp() {
  fetch('./jsonInput.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById("binnen-temp").textContent = "temperatuur: " + Math.round(data.Temperature) + " °C";
    document.getElementById("binnen-humid").textContent = "vochtigheid: " + Math.round(data.Humidity) + " %";
  });
}

setInterval(readTemp, 1000)


