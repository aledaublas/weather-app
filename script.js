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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="row forecast-row">
            <div class="col-4">${day}</div>
            <div class="col-4">
              <img src="http://openweathermap.org/img/wn/01n@2x.png"
             alt="" width="42"/></div>
            <div class="col-4"> <pre class="forecast-temps"> <b>20°</b>  /  16°</pre></div>
          </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

//changes html to display real time data
function displayData(response) {
  temperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(temperature);
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

  displayCelcius();
}

function displayCelcius() {
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("not-active");
  celcius.classList.remove("not-active");
  celcius.classList.add("active");
}

function toCelcius(event) {
  event.preventDefault();
  displayCelcius();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(temperature);
}

function toFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  celcius.classList.add("not-active");
  fahrenheit.classList.remove("not-active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (temperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(fahrenheitTemp);
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

let temperature = null;
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

searchCity("New York");
displayForecast();
