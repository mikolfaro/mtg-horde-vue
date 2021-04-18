export const phases = [
  { id: 'SURVIVORS_TURN' },
  { id: 'HORDE_DRAW' },
  { id: 'HORDE_PLAY' },
  { id: 'HORDE_ATTACK' }
]

export function shuffle(array) {
  const shuffledArray = [].concat(array);
  for(let i = shuffledArray.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}

class CallableObject extends Function {
  constructor () {
    super('...args', 'return this.__self__.__call__(...args)')
    var self = this.bind(this)
    this.__self__ = self
    return self
  }

  __call__() {
    throw new TypeError(`${this.constructor.name} is not callable`)
  }
}

class ImagePreloader extends CallableObject {
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

export const preload = new ImagePreloader()
