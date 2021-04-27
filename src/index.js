function formatDate(date) {
  let thisHour = date.getHours();
  if (thisHour < 10) {
    thisHour = `0${thisHour}`;
  }

  let thisMinute = date.getMinutes();
  if (thisMinute < 10) {
    thisMinute = `0${thisMinute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let today = days[dayIndex];

  return `${today} ${thisHour}:${thisMinute}`;
}

function getCurrentCity(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Wind: ${wind} km/h`;
}

function updateCurrentData(event) {
  event.preventDefault();
  let cityName = document.querySelector(".form-control.shadow-sm").value;
  cityName = cityName.trim().toLowerCase();
  let apiKey = "05348ae2e09beca97cb2165f14ee5d2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentCity);
}

function locate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let li = document.querySelector("#special");
let currentTime = new Date();
li.innerHTML = formatDate(currentTime);

let submitting = document.querySelector(".search-form");
submitting.addEventListener("submit", updateCurrentData);

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "05348ae2e09beca97cb2165f14ee5d2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentCity);
}

let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", locate);
