"use strict";

const apiKey = "80f22ba1119d93d075abbd03c9d638ee";

function fetchWeatherByCoords(latitude, longitude) {
  const apiUrlCur = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(apiUrlCur)
    .then((response) => response.json())
    .then((data) => {
      updateWeatherInfo(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function handleLocationError(error) {
  console.error(`Error getting location: ${error.message}`);
}

document.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      handleLocationError
    );
  } else {
    console.log("Geolocation is not supported in this browser");
  }
});

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

function updateWeatherInfo(data) {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ main }],
  } = data;

  const currentImg = document.querySelector(".img-src");

  switch (main) {
    case "Clouds":
    case "Clear":
      currentImg.src = "./images/clouds.png";
      break;
    case "Drizzle":
      currentImg.src = "./images/drizzle.png";
      break;
    case "Mist":
      currentImg.src = "./images/mist.png";
      break;
    case "Rain":
      currentImg.src = "./images/rain.png";
      break;
    case "Snow":
      currentImg.src = "./images/snow.png";
      break;
    default:
      currentImg.src = "";
  }

  document.querySelector(".city").innerHTML = name;
  document.querySelector(".degree").innerHTML = `${Math.round(temp)}°C`;
  document.querySelector(".hum").innerHTML = `${humidity}%`;
  document.querySelector(".wind").innerHTML = `${speed} Km/h`;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  const data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  } else {
    document.querySelector(".error").style.display = "none";
    updateWeatherInfo(data);
  }
}
