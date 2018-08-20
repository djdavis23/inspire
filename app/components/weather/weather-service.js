import Weather from "../../models/Weather.js";

var myZip = ''

const url = '//bcw-getter.herokuapp.com/?url=';
var url2 = 'https://api.openweathermap.org/data/2.5/weather'
const apiUrl = url + encodeURIComponent(url2);



//q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35

//@ts-ignore
const weatherApi = axios.create({
	baseURL: url2,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}

export default class WeatherService {

	get myZip() {
		return myZip
	}

	getWeather(callWhenDone, zip) {
		myZip = zip;
		console.log('Calling the Weatherman for zip', myZip)
		weatherApi.get(`?zip=${myZip},us&APPID=60380726350c8c1cdc2e15f0eab13384`)
			.then(function (res) {
				console.log(res.data)
				let myWeather = new Weather(res.data)
				console.log("weather id", myWeather.id)
				myWeather.icon = myWeather.getIcon(myWeather.id)
				console.log("weather icon: ", myWeather.icon)
				callWhenDone(myWeather);
			})
			.catch(logError)
	}
}



//&APPID=60380726350c8c1cdc2e15f0eab13384
