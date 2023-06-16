//The formatDate function formats the date and time by extracting the hours and minutes from the provided date object.
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//The displayWeatherCondition function updates the HTML elements on the webpage with the weather information received from the API response.
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}
//The searchCity function constructs the API URL based on the provided city name and makes a request to retrieve the weather data using the Axios library. It then calls the displayWeatherCondition function to update the webpage.
function searchCity(city) {
  // Function to search for weather conditions in a specific city
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949"; // API key for OpenWeatherMap
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition); // Make API request and pass the response to displayWeatherCondition
}

//The handleSubmit function is triggered when the search form is submitted. It prevents the default form submission behavior, retrieves the entered city from the input field, and calls the searchCity function with the city as an argument.
function handleSubmit(event) {
  // Function to handle the form submission event
  event.preventDefault(); // Prevent the default form submission
  let city = document.querySelector("#city-input").value; // Get the value from the city input field
  searchCity(city); // Call searchCity function with the entered city
}

//The searchLocation function is used to search for weather conditions based on the user's current location. It constructs the API URL with latitude and longitude coordinates and makes a request to retrieve the weather data. The displayWeatherCondition function is called to update the webpage.
function searchLocation(position) {
  // Function to search for weather conditions based on the user's current location
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949"; // API key for OpenWeatherMap
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//The getCurrentLocation function is triggered when the "Current Location" button is clicked. It prevents the default button behavior, retrieves the user's current location using the Geolocation API, and calls the searchLocation function with the obtained position.
function getCurrentLocation(event) {
// Function to get the user's current location and search for weather conditions
  event.preventDefault(); // Prevent the default button behavior
  navigator.geolocation.getCurrentPosition(searchLocation); // Get the current position and call searchLocation function
}

let currentTime = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(currentTime);// Format the current date and time and update the HTML element

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("click", handleSubmit);// Add event listener to the search form submit event

let btnCurrentLocation= document.querySelector("#btn-current-location");
btnCurrentLocation.addEventListener("click", getCurrentLocation);// Add event listener to the current location button click event

