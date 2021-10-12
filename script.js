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
  console.log(Math.round(response.data.wind.speed));
}

let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
let city = "Africa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
