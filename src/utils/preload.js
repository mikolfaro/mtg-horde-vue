import { CallableObject } from './commons'

export class Preload extends CallableObject {
  constructor () {
    super()
    this.preloadedUrls = []
  }

  __call__ (imageUrl) {
    if (this.preloadedUrls.includes(imageUrl)) {
      return;
    }

    const image = new Image()
    image.src = imageUrl

    this.preloadedUrls.push(imageUrl)
  }
}

const preload = new Preload()

export default preload
