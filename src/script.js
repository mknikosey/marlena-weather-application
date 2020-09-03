let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}: ${minutes}`;

function showTemperature(response) {
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let sky = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°F with ${sky} and ${humidity}% humidiy levels`;
}

function searchCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let cityName = cityInput.value;
  let apiKey = "c6f8469b8d9346b29c403a717cc53a7d";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCityName);

//
function showPosition(position) {
  let city = document.querySelector("#city");
  city.innerHTML = `Latitute is ${position.coords.latitude}. Longitude is ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-temp-button");
button.addEventListener("click", getCurrentPosition);
