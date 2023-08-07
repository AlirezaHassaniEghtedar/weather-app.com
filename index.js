const API = '4c4e02ab398ac2cd7b131a402c748b6d';
const weatherInfoElement = document.getElementById("city-weather-info");
let user_city_input;

document.querySelector("form").addEventListener("submit" , (event)=> {
    event.preventDefault();
    user_city_input = document.getElementById("city-input").value;
    getWeatherData(user_city_input);
})

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const details = [
            `Feels like:<br> ${Math.round(data.main.feels_like)}°c` , 
            `Humidity:<br> ${data.main.humidity}%` ,
            `Wind speed:<br> ${Math.round(data.wind.speed)} m/s`
        ]
        
        const weatherInfoElement = document.getElementById("city-weather-info");
        weatherInfoElement.querySelector(".weather-icon-container").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather-icon" id="weather-icon" />`;
        weatherInfoElement.querySelector("#temperature").innerHTML = `${temperature}°c`;
        weatherInfoElement.querySelector("#weather-condition").innerHTML = `${description}`;
        weatherInfoElement.querySelector(".weather-details").innerHTML = details.map((detail)=> `<div class="description-box">${detail}</div>`).join("");


    } catch (error) {
        console.log(error)
        weatherInfoElement.querySelector(".weather-icon-container").innerHTML = "";
        weatherInfoElement.querySelector("#temperature").innerHTML = "";
        weatherInfoElement.querySelector("#weather-condition").innerHTML = "An error happened , please try again later";
        weatherInfoElement.querySelector(".weather-details").innerHTML = "";
    }
}