 function showDate() {
  let todayDate = document.querySelector("#current-date");
  todayDate.innerHTML = `${day} ${hours}:${minutes}`;
}

let currentDate = new Date();

let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

showDate();

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let newCity = document.querySelector("#current-city");

  if (searchInput.value) {
    newCity.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    newCity.innerHTML = null;
    alert(`Please type a city`);
  }
}

function searchCity(city) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

searchCity("Madrid");

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector(".temperature-description");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].main;
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = response.data.name;
}