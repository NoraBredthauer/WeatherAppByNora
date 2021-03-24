
// Functions Timestamp
function callUpdateTime(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let currentTime = new Date(timestamp);
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour<10) {
  hour = `0${hour}`;
};
let minute = currentTime.getMinutes();
if (minute<10) {
  minute = `0${minute}`;
}
return `${day}, ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
let currentTime = new Date(timestamp);
let hour = currentTime.getHours();
if (hour<10) {
  hour = `0${hour}`;
};
let minute = currentTime.getMinutes();
if (minute<10) {
  minute = `0${minute}`;
}
  return `${hour}:${minute}`;
}
//Search-Form Functions

function showTemp(response) {
  celsiusTemperature=  Math.round(
    response.data.main.temp);
  document.querySelector("#temp").innerHTML = celsiusTemperature;
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  let iconID=response.data.weather[0].icon;
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${iconID}@2x.png`)
celsius.classList.add("active");
fahrenheit.classList.remove("active");
document.querySelector("#current-time").innerHTML = callUpdateTime(response.data.dt*1000);
}

function displayForecast (response) {
let forecastHours = document.querySelector("#forecastHours");
let forecastIcons = document.querySelector("#forecastIcons");
let forecastTemperatures = document.querySelector("#forecastTemperatures");
let forecastData=null;
forecastHours.innerHTML=null;
forecastIcons.innerHTML=null;
forecastTemperatures.innerHTML=null;

for (let index = 0; index < 6; index++) {
  forecastData = response.data.list[index];
  forecastHours.innerHTML+= 
  `<div class="col-2"> ${formatHours(forecastData.dt*1000)}
  </div>`;
  
  forecastIcons.innerHTML += 
  `<div class="col-2">
  <img src="https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png"/>
  </div>`;
  
  
  forecastTemperatures.innerHTML += 
  `        <div class="col-2">
            ${Math.round(forecastData.main.temp_max)}°
          </div>`;
  }
}


function search(city) {
  let apiKey = "d0f8d1f9fa465cea19969bac3ea3aac3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&&units=${units}`;
 axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
  let city = document.querySelector("#city-typed-in").value;
  search(city);
}


//Current-Button Functions

function dataPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d0f8d1f9fa465cea19969bac3ea3aac3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
 apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
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

search("Nürnberg");