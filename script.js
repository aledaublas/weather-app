//shows the real life date and time
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
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

let currentDate = document.querySelector("#full-date");
currentDate.innerHTML = `${day}, ${month} ${date} ${hour}:${minutes}`;

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
  axios.get(apiUrl).then(displayCity);
}

//changes html to display real time data
function displayCity(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  console.log(response);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
  axios.get(apiUrl).then(displayCity);
}

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
