import DOMElements from "./DOMElements.js";
import { getWeekDay, countryFullName, fullDayTime } from "./helpers.js";

export const renderCurrentWeather = data => {
  const cityName = data.name;

  const fullCountryname = countryFullName.of(data.sys.country);
  const curTemp = data.main.temp;
  const weatherIcon = data.weather[0].icon;
  const weatherID = data.weather[0].main;
  const curDate = fullDayTime(data);

  const markup = `
    <div class="date-location">
            <h1 id="city" class="city-name">${cityName}</h1>
            <h4 id="country" class="country-name">${fullCountryname}</h4>
            <span id="date" class="main-date">${curDate}</span>
          </div>
          <div class="temperature-icon">
            <h1 id="temperature" class="temperature">${Math.round(
              curTemp
            )}&#176;C</h1>
            <img src="" alt="" />
            <span id="weather-icon" class="big-weather-icon"
              ><img src="../icons/${weatherIcon}.png" alt="" /></i
            ></span>
          </div>
    `;

  if (weatherID === "Smoke" || weatherID === "Haze" || weatherID === "Fog")
    return "Mist";
  if (weatherID === "Sand") return "Dust";
  if (weatherID === "Squall") return "Tornado";

  DOMElements.curWeatherContainer.insertAdjacentHTML("afterbegin", markup);

  DOMElements.weatherPhoto.style.backgroundImage = `linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.4)
  ),
  url("../img/${weatherID}.jpg")`;
};

export const renderDetailedWeather = data => {
  const minTemp = data.main.temp_min;
  const maxTemp = data.main.temp_max;
  const feelsTemp = data.main.feels_like;
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  const markup = `
       <div class="temp-details">
              <p>Min. temp: <span>${Math.round(minTemp)}&#176;C</span></p>
              <p>Max. temp: <span>${Math.round(maxTemp)}&#176;C</span></p>
              <p>Feels temp: <span>${Math.round(feelsTemp)}&#176;C</span></p>
            </div>
            <div class="other-details">
              <p>Wind: <span>${wind} m/s</span></p>
              <p>Humidity: <span>${humidity} %</span></p>
              <p>Pressure: <span>${pressure} hPa</span></p>
            </div>
       `;
  DOMElements.curDetailsContainer.insertAdjacentHTML("afterbegin", markup);
};

export const renderForecastWeather = data => {
  const forecast = [];
  const dataArray = data.list;
  for (let i = 0; i < dataArray.length; i++) {
    const oneDay = {
      day: getWeekDay(dataArray[i].dt),
      weatherIcon: dataArray[i].weather[0].icon,
      temp: dataArray[i].temp.day,
    };
    forecast.push(oneDay);
  }
  //   console.log(forecast);

  //   return forecast;

  const markup = `
  <div class="day">
  <p class="forecast-day">${forecast[0].day}</p>
  <p class="forecast-icon">
  <img src="../icons/${forecast[0].weatherIcon}.png" alt="" width=50px /></i>
  </p>
  <p class="forecast-temp">${Math.round(forecast[0].temp)}&#176;C</p>
</div><div class="day">
<p class="forecast-day">${forecast[1].day}</p>
<p class="forecast-icon">
<img src="../icons/${forecast[1].weatherIcon}.png" alt="" width=50px /></i>
</p>
<p class="forecast-temp">${Math.round(forecast[1].temp)}&#176;C</p>
</div><div class="day">
<p class="forecast-day">${forecast[2].day}</p>
<p class="forecast-icon">
<img src="../icons/${forecast[2].weatherIcon}.png" alt="" width=50px /></i>
</p>
<p class="forecast-temp">${Math.round(forecast[2].temp)}&#176;C</p>
</div><div class="day">
<p class="forecast-day">${forecast[3].day}</p>
<p class="forecast-icon">
<img src="../icons/${forecast[3].weatherIcon}.png" alt="" width=50px /></i>
</p>
<p class="forecast-temp">${Math.round(forecast[3].temp)}&#176;C</p>
</div><div class="day">
<p class="forecast-day">${forecast[4].day}</p>
<p class="forecast-icon">
<img src="../icons/${forecast[4].weatherIcon}.png" alt="" width=50px /></i>
</p>
<p class="forecast-temp">${Math.round(forecast[4].temp)}&#176;C</p>
</div>
`;
  DOMElements.forecastContainer.insertAdjacentHTML("afterbegin", markup);
};

export const clearContainers = () => {
  DOMElements.curWeatherContainer.innerHTML = "";
  DOMElements.curDetailsContainer.innerHTML = "";
  DOMElements.forecastContainer.innerHTML = "";
  DOMElements.searchInput.value = "";
};

export const renderLoader = () => {};
