import UserService from "./user-service.js"

let userService = new UserService

function drawUser(user) {
  let template = `
    <h1>Hello ${user}<h1>  
  `
  document.getElementById("user").innerHTML = template
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
    drawUser(user)
  }


}
