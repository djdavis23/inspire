import UserService from "./user-service.js"

let userService = new UserService

function draw(user) {
  let template = `
    <h1>Hello ${user}<h1>  
  `
  document.getElementById("user").innerHTML = template
}

export default class UserController {


  setUser(e) {
    e.preventDefault()
    console.log(e.target.username.value)
    let user = e.target.username.value
    userService.setUser(user)
    draw(user)
  }
}
