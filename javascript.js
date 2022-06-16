// Global variables
var cityHistory = [];
let hist = localStorage.getItem('city-history');
  if(hist) {
    cityHistory = JSON.parse(hist);
  }

var weatherApiUrl= 'https://api.openweathermap.org';
var ApiKey = 'ffd5835085c5c060761fc94438b898ef';
// var ApiKey = '452691537bbf409c6544c02c76a1f6ad';

var cityForm = document.querySelector('#city-form');
var cityInput = document.querySelector('#city-input');
var todayContainer = document.getElementById('today');
var cityHistoryContainer = document.getElementById('city-history');


// var forecastContainer = document.querySelector('#5day-forecast');
// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);





displaycityHistory();

function displaycityHistory() {
  // document.getElementById("option-1").textContent = cityHistory[0];
   // Start at end of history array and count down to show the most recent at the top.
   for (var i = cityHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute('data-search', cityHistory[i]);
    btn.textContent = cityHistory[i];
    cityHistoryContainer.append(btn);
   }  
}
function appendToHistory(city) {
    // If there is no search term return the function
    if (cityHistory.indexOf(city) !== -1) {
      return;

    }
    cityHistory.push(city);
  
    localStorage.setItem('city-history', JSON.stringify(cityHistory));
    displaycityHistory();
  }
  function displayCurrentWeather (city, current, timezone) {
    var date = dayjs().tz(timezone).format('M/D/YYYY');
    // Store response data from our fetch request in variables
    var tempF = current.temp;
    var windMph = current.wind_speed;
    var humidity = current.humidity;
    var uvi = current.uvi;
    var iconUrl = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;
    var iconDescription = current.weather[0].description || weather[0].main;
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvEl = document.createElement('p');
    var uviBadge = document.createElement('button');
    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempEl.textContent = `Temp: ${tempF}°F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, tempEl, windEl, humidityEl);
    uvEl.textContent = 'UV Index: ';
    uviBadge.classList.add('btn', 'btn-sm');
    if (uvi < 3) {
      uviBadge.classList.add('btn-success');
    } else if (uvi < 7) {
      uviBadge.classList.add('btn-warning');
    } else {
      uviBadge.classList.add('btn-danger');
    }
    uviBadge.textContent = uvi;
    uvEl.append(uviBadge);
    cardBody.append(uvEl);
    todayContainer.innerHTML = '';
    todayContainer.append(card);
  }
  function displayForecast (daily, timezone) {
  let time = daily[1].dt;
  console.log("daily", daily);

  document.getElementById("date-1").textContent = " Date: " + dayjs.unix(time).tz(timezone).format('M/D/YYYY');
  document.getElementById("temp-1").textContent = `Temp: ${daily[1].temp.day}°F`;
  document.getElementById("wind-1").textContent = " Wind: " + daily[1].wind_speed + " MPH";
  document.getElementById("humidity-1").textContent = " Humidity: " + daily[1].humidity + " %";

  time = daily[2].dt;
  document.getElementById("date-2").textContent = " Date: " + dayjs.unix(time).tz(timezone).format('M/D/YYYY');
  document.getElementById("temp-2").textContent = `Temp: ${daily[2].temp.day}°F`;
  document.getElementById("wind-2").textContent = " Wind: " + daily[2].wind_speed + " MPH" ;
  document.getElementById("humidity-2").textContent = " Humidity: " + daily[2].humidity + " %";

  time = daily[3].dt;
  document.getElementById("date-3").textContent = " Date: " + dayjs.unix(time).tz(timezone).format('M/D/YYYY');
  document.getElementById("temp-3").textContent = `Temp: ${daily[3].temp.day}°F`;
  document.getElementById("wind-3").textContent = " Wind: " + daily[3].wind_speed + " MPH";
  document.getElementById("humidity-3").textContent = " Humidity: " + daily[3].humidity + " %";

  time = daily[4].dt;
  document.getElementById("date-4").textContent = " Date: " + dayjs.unix(time).tz(timezone).format('M/D/YYYY');
  document.getElementById("temp-4").textContent = `Temp: ${daily[4].temp.day}°F`;
  document.getElementById("wind-4").textContent = " Wind: " + daily[4].wind_speed + " MPH";
  document.getElementById("humidity-4").textContent = " Humidity: " + daily[4].humidity + " %";

  time = daily[5].dt;
  document.getElementById("date-5").textContent = " Date: " + dayjs.unix(time).tz(timezone).format('M/D/YYYY');
  document.getElementById("temp-5").textContent = `Temp: ${daily[5].temp.day}°F`;
  document.getElementById("wind-5").textContent = " Wind: " + daily[5].wind_speed + " MPH";
  document.getElementById("humidity-5").textContent = " Humidity: " + daily[5].humidity + " %";

      // Create unix timestamps for start and end of 5 day forecast
  // var startDt = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
  // var endDt = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();

  // var headingCol = document.createElement('div');
  // var heading = document.createElement('h4');

  // headingCol.setAttribute('class', 'col-12');
  // heading.textContent = '5-Day Forecast:';
  // headingCol.append(heading);

  // forecastContainer.innerHTML = '';
  // forecastContainer.append(headingCol);
  // for (var i = 0; i < dailyForecast.length; i++) {
    // The api returns forecast data which may include 12pm on the same day and
    // always includes the next 7 days. The api documentation does not provide
    // information on the behavior for including the same day. Results may have
    // 7 or 8 items.
  //   if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
  //     displayForecastCard(dailyForecast[i], timezone);
  //   }
  // }
  }
function renderPage (city, data) {
        displayCurrentWeather(city, data.current, data.timezone);
        displayForecast(data.daily, data.timezone);
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
  function handleCityHistory (event) {
    let button = event.target
    let city = button.getAttribute('data-search');
    getCoords (city);
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
cityHistoryContainer.addEventListener('click', handleCityHistory);