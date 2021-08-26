//shows the real life date and time
let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
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
  "December",
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

function toCelcius(event) {
  event.preventDefault();
  let celcius = document.querySelector("#temperature");
  celcius.innerHTML = "19";
}

function toFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = "66";
}

//save city searched in a variable and starts search in a new function
function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//connects to weather api to search using the city variable as a parameter/argument
function searchCity(city) {
  let apiKey = "d130217ec0baefbb5c62f20058666bef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

//changes html to display real time data
function displayData(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
}

//function for current location button
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

function retrivePosition(position) {
  let apiKey = "d130217ec0baefbb5c62f20058666bef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}
// formats time
function formatTime(timestamp) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

searchCity("New York");
//starts search process when user inputs city
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);

// changes temp to celcius or fahrenheit
let celcius = document.querySelector("#temp-celcius");
celcius.addEventListener("click", toCelcius);

let fahrenheit = document.querySelector("#temp-fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
