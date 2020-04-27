const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};
    weather.temperature = {
        // value = 
        unit : "celsius"
    }

    const KELVIN = 273;
    //API kEY
    const key = "3c9686c88bcef13840e4b06151909ee9";


    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition,showError);
    }
    else{
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Browser does't support geoloction</p>";
    }
    function setPosition(position){
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            getWeather(latitude,longitude);
    }
    function showError(error){
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p> ${error.message} </p>`;  
    }

    function getWeather(latitude,longitude){
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;  
        fetch(api).then(function(response){
            let data = response.json();
            return data;
        }).then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.temperature.value = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then (function(){
            displayWeather();
          });
      
    }
    function displayWeather(){
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`; 
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;  
        descElement.innerHTML = weather.description;  
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;  
    }
    function celsiusToFahrenheit(temperature){  
        return (temperature * 9/5) + 32;  
    }  
      
    tempElement.addEventListener("click",function(){
        if(weather.temperature.value === undefined) return;
        if(weather.temperature.unit === "celsius"){
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);

            tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit = "fahrenheit";
        }else{
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        }
    });