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