var city = document.getElementById("citySearch");
var findBtn = document.getElementById("findLocation");
var today = document.getElementById("today");
var todayDate = document.getElementById("todayDate");
var todayTemp = document.getElementById("todayTemp");
var modelight = document.getElementById("modelight");
var desc = document.getElementById("desc");
var humid = document.getElementById("humid");
var windSpeed = document.getElementById("windSpeed");
var windDirec = document.getElementById("windDirec");
var cityName = document.getElementById("city");
var nextResults = document.getElementById("nextResults");
var contactPage = document.getElementById("contactPage");
var forcast;
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augast",
  "September",
  "Octobar",
  "Novamber",
  "December",
];
var directions = {
  WNW: "West-northwest",
  NNW: "North-northwest",
  NNE: "North-northeast",
  ENE: "East-northeast",
  ESE: "East-southeast",
  SSE: "South-southeast",
  SSW: "South-southwest",
  WSW: "West-southwest",
  N: "North",
  E: "East",
  W: "West",
  S: "South",
  NE: "North-East",
  SE: "South-East",
  NW: "North-West",
  SW: "South-West",
};
var d = new Date();
var todayDay = days[d.getDay()];
var h = d.getHours();
if (city.value == "") {
  city.value = "cairo";
  getAPIdata();
  city.value = "";
}

city.addEventListener("input", function () {
  getAPIdata();
});

function getAPIdata() {
  var weather = new XMLHttpRequest();
  weather.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=00cce2bdc4fc4b6dbcd171534240812&q=${city.value}&days=3`
  );
  weather.send();
  weather.addEventListener("readystatechange", function () {
    if (weather.readyState == 4) {
      forcast = JSON.parse(weather.response);
      console.log(forcast);
      updateWeather();
    }
  });
  weather.addEventListener("error", function () {
    console.log("URL Error");
  });
}

function updateWeather() {
  todayDate.innerHTML = d.getDate() + Months[d.getMonth()];
  today.innerHTML = todayDay;
  cityName.innerHTML = forcast.location.name;
  todayTemp.innerHTML = forcast.forecast.forecastday[0].hour[h].temp_c + `°C`;
  modelight.setAttribute(
    "src",
    `https:${forcast.forecast.forecastday[0].hour[h].condition.icon}`
  );
  desc.innerHTML = forcast.forecast.forecastday[0].hour[h].condition.text;
  humid.innerHTML = forcast.forecast.forecastday[0].hour[h].humidity + `%`;
  windSpeed.innerHTML =
    forcast.forecast.forecastday[0].hour[h].wind_kph + `km/h`;
  windDirec.innerHTML =
    directions[forcast.forecast.forecastday[0].hour[h].wind_dir];
  //  next days
  var bag = ``;
  for (var i = 1; i <= 2; i++) {
    bag += `
  <div class="col-md-6 p-0">
              <div class="bg3 text-center p-2" id="dayhead${i}">
                <span id="nextday">${
                  d.getDay() + i <= 6
                    ? days[d.getDay() + i]
                    : days[d.getDay() + i == 7 ? 0 : 1]
                }</span>
              </div>
              <div
                class="bg2 d-flex flex-column justify-content-center align-items-center row-gap-5"
              id="daybody${i}"
                >
                <div id="weatherMode">
                  <img src="https:${
                    forcast.forecast.forecastday[i].day.condition.icon
                  }" alt="mode" />
                </div>
                <h1 id="nextdayTemph" class="text-white" >${
                  forcast.forecast.forecastday[i].day.maxtemp_c + `°C`
                }</h1>
                <h5 id="nextdayTempl">${
                  forcast.forecast.forecastday[i].day.mintemp_c + `°C`
                }</h5>
                <h6 id="nextDesc" class="fw-light text-primary" >${
                  forcast.forecast.forecastday[i].day.condition.text
                }</h6>
              </div>
            </div>
  `;
  }
  nextResults.innerHTML = bag;
}

findBtn.addEventListener("click", function () {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    city.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  city.value = position.coords.latitude + "," + position.coords.longitude;
  getAPIdata();
  city.value = "";
}

contactPage.addEventListener("href", function () {
  console.log("hi");
});
