
export default class Todo {
  constructor(data) {
    this.description = data.description
    this.user = data.user
    this.completed = data.completed
    this._id = data._id
  }
}