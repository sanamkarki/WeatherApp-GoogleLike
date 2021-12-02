function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayArray[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let weatherForecastDayElement = document.querySelector("#weatherForecastDay");
  let FinalForecastValue = `<div class= "row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      FinalForecastValue =
        FinalForecastValue +
        `
  <div class="col-2"> 
  <div>${formatDay(forecastday.dt)}
  <img src= "https://openweathermap.org/img/wn/${
    forecastday.weather[0].icon
  }@2x.png" width="55" height="55"/>
  </div>
  <div><span class="max-Temp"> ${Math.round(
    forecastday.temp.max
  )}°|</span><span class="min-Temp"> ${Math.round(
          forecastday.temp.min
        )}° </span></div>
</div>

 `;
    }
  });
  FinalForecastValue = FinalForecastValue + `</div>`;
  weatherForecastDayElement.innerHTML = FinalForecastValue;
}

function getForecast(coordinates) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&apiKey=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = response.data.name;
  let descriptionsElement = document.querySelector("#descriptions");
  descriptionsElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateandTimeElement = document.querySelector("#dateandTime");
  dateandTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  console.log(response.data.weather[0].icon);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputValueElement = document.querySelector("#inputValue");
  search(inputValueElement.value);
  console.log(inputValueElement.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSubmit);
search("New York");
/*function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitValue = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

// farh to celsius conversion
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusElement = document.querySelector("#celsciusId");
celsiusElement.addEventListener("click", showCelsiusTemp);*/
