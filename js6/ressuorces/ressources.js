import { ArrayImages } from "../Image.js";
import { MemeArray } from "../MemeArray.js";

class Ressources {
  #images;
  #memes;
 
  constructor() {
    this.#images = new ArrayImages();
    this.#memes = new MemeArray();
    this.UUID=(Math.random()*10000).toFixed(2)
  }
  get images() {
    return this.#images;
  }
  get memes() {
    return this.#memes;
  }
}

export default new Ressources();