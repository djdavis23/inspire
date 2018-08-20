
var user

export default class UserService {
  setUser(username) {
    user = username
  }

  get user() {
    return user
  }
}

