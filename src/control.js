import Model from "./model.js";
import * as view from "./view.js";
import DOMElements from "./DOMElements.js";

const state = {};

const searchController = async () => {
  const inputValue = DOMElements.searchInput.value;

  if (!inputValue) return;

  view.clearContainers();
  view.renderLoader();
  state.weatherData = new Model(inputValue);
  await state.weatherData.loadCurrentWeather();
  await state.weatherData.loadForecastWeather();

  handlerController();
};

const handlerController = () => {
  view.clearContainers();
  if (state.weatherData) {
    view.renderCurrentWeather(state.weatherData.weatherData);
    view.renderDetailedWeather(state.weatherData.weatherData);
    view.renderForecastWeather(state.weatherData.forecastData);
    DOMElements.searchInputDiv.style.transform = "none";
    DOMElements.searchBox.style.position = "relative";
    DOMElements.searchBox.style.textAlign = "none";
  } else {
    alert("Bad request");
  }
};

DOMElements.searchButton.addEventListener("click", e => {
  e.preventDefault();
  searchController();
});

DOMElements.searchBox.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchController();
  }
});
