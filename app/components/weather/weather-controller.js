import WeatherService from "./weather-service.js";

var weatherService = new WeatherService()

function draw(weather) {
	let template = `
<h3>Temp:  ${weather.temp.toFixed(0)}&#176F</h3>
<h3>Skies:  ${weather.sky}<h3>

`
	document.getElementById("weather").innerHTML = template;
}


export default class WeatherController {

	constructor() {
		//this will fire off get weather right away
		this.getWeather()
	}
	getWeather() {
		weatherService.getWeather(draw)
		//What can you do with this weather object?
	}
}

