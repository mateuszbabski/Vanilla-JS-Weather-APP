import { KEY, KEY2 } from "./config.js";
import { getJSON } from "./helpers.js";

class Model {
  constructor(inputValue = "") {
    this.inputValue = inputValue;
    this.weatherData = {};
    this.forecastData = {};
  }

  async loadCurrentWeather() {
    try {
      const data = await getJSON(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.inputValue}&units=metric&appid=${KEY}`
      );
      console.log(data);
      this.weatherData = data;
      //   console.log(this.weatherData);
    } catch (err) {
      console.error(`Bad request - check city name ${err}`);
    }
  }

  async loadForecastWeather() {
    try {
      const data = await getJSON(`
        https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.inputValue}&units=metric&cnt=5&appid=${KEY2}`);

      this.forecastData = data;
      //   console.log(this.forecastData);
    } catch (err) {
      console.error(`Bad request - check city name ${err}`);
    }
  }
}

export default Model;
