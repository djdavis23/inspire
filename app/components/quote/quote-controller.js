import QuoteService from "./quote-service.js";

let qs = new QuoteService

function draw(quote) {
	console.log(quote)
	let template = `
		<h2 class="right">${quote.quote}</h2>
		<h4 class-"right">- ${quote.author}</h4>
	`

	document.getElementById("quote").innerHTML = template
}

export default class QuoteController {
	constructor() {
		this.getQuote()
	}

	getQuote() {
		qs.getQuote(draw)
	}
}
