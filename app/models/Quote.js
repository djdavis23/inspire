export default class Quote {
  constructor(data) {
    this.id = data.id
    this.author = data.author
    this.quote = data.quote
    this.permalink = data.permalink
  }
}