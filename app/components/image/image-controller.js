import ImageService from "./image-service.js";

//Your ImageService is a global class what can you do here to instantiate it?
const imageService = new ImageService()

const body = document.getElementById("body")

function draw(image) {
  body.style.backgroundImage = `url(${image.largeUrl})`
  body.style.backgroundSize = "cover"
}

export default class ImageController {
  constructor() {
    imageService.getImage(draw)
  }

}

