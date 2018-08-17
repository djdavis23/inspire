import Quote from "../../models/Quote.js";

let url = '//bcw-getter.herokuapp.com/?url=';
let url2 = 'http://quotesondesign.com/api/3.0/api-3.0.json';
let apiUrl = url + encodeURIComponent(url2);
//Do Not Edit above we have to go through the bcw-getter to access this api

//@ts-ignore
const quoteApi = axios.create({
	baseURL: apiUrl,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}

export default class QuoteService {
	getQuote(callWhenDone) {
		console.log('looking for some good quotes')
		quoteApi.get()
			.then(res => {
				console.log(res.data)
				let myQuote = new Quote(res.data)
				callWhenDone(myQuote)
			})
			.catch(logError)
	}
}
