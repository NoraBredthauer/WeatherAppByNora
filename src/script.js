//Search-Form Functions

function showTemp(response) {
  celsiusTemperature=  Math.round(
    response.data.main.temp);
  document.querySelector("#temp").innerHTML = celsiusTemperature;
  document.querySelector(
    "#City"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  let iconID=response.data.weather[0].icon;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`)

}

function search(city) {
  let apiKey = "d0f8d1f9fa465cea19969bac3ea3aac3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
    event.preventDefault();
  let city = document.querySelector("#city-typed-in").value;
  search(city);
}


//Current-Button Functions

function dataPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d0f8d1f9fa465cea19969bac3ea3aac3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function callNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(dataPosition);
}


//Switch Units Functions 

function showFahrenheit(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temp");
let calculateFahrenheit = Math.round((celsiusTemperature*9)/5+32);
temperatureElement.innerHTML = calculateFahrenheit;
celsius.classList.remove("active");
fahrenheit.classList.add("active");
}

function showCelsius(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temp");
temperatureElement.innerHTML = celsiusTemperature;
celsius.classList.add("active");
fahrenheit.classList.remove("active");
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", callNavigator);

let celsiusTemperature=null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
let time = `${hour}:${minute}`;

let showTime = document.querySelector("#current-time");
showTime.innerHTML = `${day}, ${time} `;

search("Nürnberg");