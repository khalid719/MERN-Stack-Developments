document.addEventListener('DOMContentLoaded', () => {

const api_KEY = "8c8f60f919293a90ddf109cc8c9c5374" 
const api_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="   

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")


// Api Response

async function checkWeather(city) {
    try {
        const response = await fetch(api_URL + city + `&appid=${api_KEY}`)

        if (!response.ok) {
            if (response.status === 404) {
                alert("City not found")
            } else {
                alert("Something went wrong. Try again later.")    
            }
            return
        }

        const data = await response.json()


        // DOM Manipulation

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

        const weatherMain = data.weather[0].main

        if (weatherMain === 'Clouds') {
            weatherIcon.src = "images/clouds.png"
        } else if (weatherMain === 'Rain') {
            weatherIcon.src = "images/rain.png"
        } else if (weatherMain === 'Drizzle') {
            weatherIcon.src = "images/drizzle.png"
        } else if (weatherMain === 'Snow') {
            weatherIcon.src = "images/snow.png"
        } else if (weatherMain === 'Mist') {
            weatherIcon.src = "images/mist.png"
        } else if (weatherMain === 'Clear') {
            weatherIcon.src = "images/clear.png"
        } 
        else {
            weatherIcon.src = "images/clouds.png"
        }


    } catch (error) {
        console.log("Error fetch weather data:", error);
        alert("Unable to fetch weather data. Please check your Internet Connection")
        
    }
}

    searchBtn.addEventListener('click', () => {
        const city = searchBox.value.trim()
        if (city) {
            checkWeather(city)
            searchBox.value = ""
        }
    })

    searchBox.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            const city = searchBox.value.trim()     
            if (city) {
            checkWeather(city)
            searchBox.value = ""
        }
    }
})

})