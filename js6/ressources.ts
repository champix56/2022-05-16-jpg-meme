import { REST_ADR } from "./config/config.js";
import { ArrayImages } from "./Image.js";
import { Meme, MemeArray, MemeImage } from "./Meme6.js";
import {Image} from './Image.js'
interface IImage {
  w: number;
  h: number;
  url: string;
  titre: string;
}

class Ressources {
  #memes: MemeArray;
  #images: ArrayImages;
  constructor() {
    this.#memes = new MemeArray();
    this.#images = new ArrayImages();
  }
  get images():ArrayImages {
    return this.#images;
  }
  set images(imgs:ArrayImages){
    this.#images.splice(0);
    imgs.map((e:Image)=>this.#images.push(e))
  }
  get memes():MemeArray {
    return this.#memes;
  }
  set memes(memes:MemeArray){
    this.#memes.splice(0);
    memes.map((e:Meme|MemeImage)=>this.#memes.push(e))
  }
}
export default new Ressources();