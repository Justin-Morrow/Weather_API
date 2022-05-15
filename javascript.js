// Global variables
var cityHistory = [];
var weatherApiUrl= 'https://api.openweathermap.org';
var ApiKey = 'fd5835085c5c060761fc94438b898ef';

var cityForm = document.querySelector('#city-form');
var cityInput = document.querySelector('#city-input');
function rendercityHistory() {
    // TBD
    
}
function appendToHistory(city) {
    // If there is no search term return the function
    if (cityHistory.indexOf(city) !== -1) {
      return;
    }
    cityHistory.push(city);
  
    localStorage.setItem('city-history', JSON.stringify(cityHistory));
    rendercityHistory();
  }
  function renderCurrentWeather (city, current, timezone) {
    //   TBD
  }
  function renderForecast (daily, timezone) {
      //TBD
  }
function renderPage (city, data) {
        renderCurrentWeather(city, data.current, data.timezone);
        renderForecast(data.daily, data.timezone);
      }

function getWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${ApiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        console.log('res', res);
        return res.json();
      })
      .then(function (data) {
        renderPage(city, data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
function getCoords(search) {
    console.log("getCoords")
    var apiUrl = `${weatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${ApiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        console.log('response', res)
        return res.json();
      })
      .then(function (data) {
        if (!data[0]) {
          alert('Location not found');
        } else {
          appendToHistory(search);
          getWeather(data[0]);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  
function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    console.log("search form submit");
    if (!cityInput.value) {
      return;
    }
  
    e.preventDefault();
    var search = cityInput.value.trim();
    console.log(search);
    getCoords(search);
    cityInput.value = '';
  }

cityForm.addEventListener('submit', handleSearchFormSubmit);