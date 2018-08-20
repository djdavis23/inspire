import UserService from "./user-service.js"

let userService = new UserService

function drawGreeting(user, greet) {
  let template = `
    <h1>${greet}${user}<h1>  
  `
  //hide login form and reveal user data
  document.getElementById("greeting").innerHTML = template
  document.getElementById("user").classList.add("hidden")
  document.getElementById("clock").classList.remove("hidden")
  document.getElementById("quote").classList.remove("hidden")
  document.getElementById("weather").classList.remove("hidden")
  document.getElementById("todo").classList.remove("hidden")
  document.getElementById("info-panel").classList.add("translucent")
}

//initiates a clock
function setClock() {
  let today = new Date();
  var h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = formatTime(m)
  s = formatTime(s)
  //convert hours to 12 hour format
  let h12 = convertTime(h)
  h12 = formatTime(h12)
  let suffix = " AM"
  if (h >= 12) {
    suffix = " PM"
  }
  document.getElementById("clock").innerHTML = `
    <h1>${h12}:${m}:${s}${suffix}
    <hr />
  `
  var t = setTimeout(setClock, 500);
  return h;
}

//add leading zero to minutes and seconds less than 10
function formatTime(x) {
  if (x < 10) {
    x = '0' + x
  }
  return x
}

//convert time to 12 hours format
function convertTime(h) {
  if (h != 12) {
    h = h % 12
  }
  return h
}


//modify greeting based on time of day
function setGreeting(hour) {
  let greet = "Hello "
  hour = parseInt(hour)
  if (hour >= 18) {
    greet = "Good Evening "
  }
  else if (hour >= 12) {
    greet = "Good Afternoon "
  }
  else {
    greet = "Good Morning "
  }
  return greet
}

export default class UserController {


  setUser(e) {
    e.preventDefault()
    console.log(e.target.username.value)
    let user = e.target.username.value
    userService.setUser(user)
    let hour = setClock()
    let greet = setGreeting(hour)
    drawGreeting(user, greet)
  }


}
