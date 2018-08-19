import UserService from "./user-service.js"

let userService = new UserService

function drawGreeting(user) {
  let template = `
    <h1>Hello ${user}<h1>  
  `
  document.getElementById("greeting").innerHTML = template
  document.getElementById("user").classList.add("hidden")
  document.getElementById("clock").classList.add("hidden")
  document.getElementById("quote").classList.remove("hidden")
  document.getElementById("weather").classList.remove("hidden")
  document.getElementById("todo").classList.remove("hidden")
}

function setClock() {
  let today = new Date();
  var h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = formatTime(h)
  m = formatTime(m)
  s = formatTime(s)
  document.getElementById("clock").innerHTML = `
    <h1>${h}:${m}:${s}
  `
  var t = setTimeout(setClock, 500);
}

function formatTime(x) {
  if (x < 10) {
    x = '0' + x
  }
  return x
}
export default class UserController {


  setUser(e) {
    e.preventDefault()
    console.log(e.target.username.value)
    let user = e.target.username.value
    userService.setUser(user)
    setClock()
    drawGreeting(user)
  }


}
