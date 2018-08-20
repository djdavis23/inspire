import WeatherService from "./weather-service.js";

var weatherService = new WeatherService()

function draw(weather) {
	let wind = convertWind(weather)
	let template = `
	
	<label for="zip">Zip Code:<form onsubmit="app.controllers.weatherController.getWeather(event)">
		<input class="input" id="zip" type="text" name="zip" placeholder="${weatherService.myZip}"></label>
	</form>
	<h3> Current weather for ${weather.city}</h3>
	<i id="weather-icon" class="${weather.icon}"></i>
	<h3>Temp:  ${weather.temp.toFixed(0)}&#176F &ensp;  Skies:  ${weather.sky}</h3>
	<h3>Wind: ${wind.speed.toFixed(0)} mph, ${wind.direction}<h3>
	<hr />
`
	document.getElementById("weather").innerHTML = template;
}

//convert raw wind data to commonly used units
function convertWind(weather) {
	//convert windspeed from m/s to mi/hr
	let wSpeed = weather.windSpeed * (3600 / 1600)
	let wDir = ''
	if (weather.windDir >= 340 || weather.windDir <= 20) {
		wDir = "N"
	}
	else if (weather.windDir > 20 || weather.windDir < 70) {
		wDir = "NE"
	}
	else if (weather.windDir >= 70 || weather.windDir <= 110) {
		wDir = "E"
	}
	else if (weather.windDir > 110 || weather.windDir < 160) {
		wDir = "SE"
	}
	else if (weather.windDir >= 160 || weather.windDir <= 200) {
		wDir = "S"
	}
	else if (weather.windDir > 200 || weather.windDir < 250) {
		wDir = "SW"
	}
	else if (weather.windDir >= 250 || weather.windDir <= 290) {
		wDir = "W"
	}
	else {
		wDir = "NW"
	}

	return {
		speed: wSpeed,
		direction: wDir
	}
}


export default class WeatherController {

	constructor() {
		//this will fire off get weather right away
		weatherService.getWeather(draw, '83646')
	}
	getWeather(e) {
		e.preventDefault();
		let zip = e.target.zip.value
		weatherService.getWeather(draw, zip)
	}
}

