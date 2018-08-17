
function tempConvert(tempK) {
  return (tempK * (9 / 5) - 459.67)
}

export default class Weather {
  constructor(data) {
    this.temp = tempConvert(data.main.temp)
    this.humidity = data.main.humidity
    this.sky = data.weather[data.weather.length - 1].main
    this.windSpeed = data.wind.windSpeed
    this.windDir = data.wind.deg
    this.sunrise = data.sys.sunrise
    this.sunset = data.sys.sunset
  }
}