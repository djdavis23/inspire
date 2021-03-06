import Image from "../../models/Image.js"

const url = '//bcw-getter.herokuapp.com/?url=';
const url2 = 'http://www.splashbase.co/api/v1/images/search?query=computer+programming'

let today = new Date().getDate()
let picIndex = today % 14



const apiUrl = url + encodeURIComponent(url2);
//@ts-ignore
const imgApi = axios.create({
	baseURL: apiUrl,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}

export default class ImageService {
	getImage(callWhenDone) {
		console.log("Looking for a good pic")
		imgApi.get()
			.then(res => {
				console.log('Image Data:', res)
				let myImage = new Image(res.data.images[picIndex])
				console.log("My Image", myImage)
				callWhenDone(myImage)
			})
			.catch(logError)
	}
}
