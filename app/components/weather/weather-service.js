import Weather from "../../models/Weather.js";

const url = '//bcw-getter.herokuapp.com/?url=';
const url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35'
const apiUrl = url + encodeURIComponent(url2);

//@ts-ignore
const weatherApi = axios.create({
	baseURL: apiUrl,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}

export default class WeatherService {

	getWeather(callWhenDone) {
		console.log('Calling the Weatherman')
		weatherApi.get()
			.then(function (res) {
				//localStorage.setItem('weather', JSON.stringify(res.data))
				console.log(res.data)
				let myWeather = new Weather(res.data)
				callWhenDone(myWeather);
			})
			.catch(logError)
	}
}
