//convert Kelvin to Farenheight
function tempConvert(tempK) {
  return (tempK * (9 / 5) - 459.67)
}



export default class Weather {
  constructor(data) {
    this.temp = tempConvert(data.main.temp)
    this.humidity = data.main.humidity
    this.sky = data.weather[0].main
    this.windSpeed = data.wind.speed
    this.windDir = data.wind.deg
    this.sunrise = data.sys.sunrise
    this.sunset = data.sys.sunset
    this.city = data.name
    this.sunrise = data.sys.sunrise
    this.sunset = data.sys.sunset
    this.id = data.weather[0].id
    this.icon = ''
  }
  //this function based upon code found at https://gist.github.com/tbranyen/62d974681dea8ee0caa1
  //this maps the openweather.org codes to weather icons downloaded from 
  //https://erikflowers.github.io/weather-icons/

  getIcon(code) {
    let prefix = 'wi wi-';
    let icon = code

    let now = new Date()
    let sunrise = new Date(this.sunrise * 1000)
    let sunset = new Date(this.sunset * 1000)

    let tod = "night-"
    //determine if it is day or night
    if (now >= sunrise && now <= sunset) {
      tod = "day-"
    }
    //ids between 700-799 and 900-999 do not have day prefixes
    if (!(code > 699 && code < 800) && !(code > 899)) {
      icon = tod + icon
    }

    //add prefix
    icon = prefix + "owm-" + icon

    return icon
  }

}


