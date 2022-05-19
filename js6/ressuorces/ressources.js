import { ArrayImages } from "../Image.js";
import { MemeArray } from "../MemeArray.js";

class Ressources {
  #images;
  #memes;
  constructor() {
    this.#images = new ArrayImages();
    this.#memes = new MemeArray();
  }
  get images() {
    return this.#images;
  }
  get memes() {
    return this.#memes;
  }
}
export default new Ressources();