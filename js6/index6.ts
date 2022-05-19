import ressources from "./ressources.js";
import IMeme from "./interfaces/meme.js";
import { MemeArray, MemeImage } from "./Meme6.js";
import { ArrayImages, Image } from "./Image.js";
import { MemeGenratorDOM } from "./MemeHandler.js";
// import {memeGenerator} from './MemeHandler.js';
class App {
  #wrapperDom: HTMLElement | null = null;
  #memeHandler: MemeGenratorDOM;
  constructor() {
    this.#memeHandler = new MemeGenratorDOM();
    document.addEventListener("DOMContentLoaded", (evt: Event) => {
      this.#wrapperDom = document.querySelector("#wrapper");
      this.initLoading();
    });
  }
  initLoading(): Promise<[ArrayImages, MemeArray] | string> {
    const prImages = ressources.images.load();
    const prMemes = ressources.memes.load();
    const syncPromise = Promise.all([prImages, prMemes]);

    const tmPromise = new Promise(
      (resolve = (message) => console.log(message)) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve("Promise B win!");
        }, 500);
        return "error";
      }
    );
    return Promise.race([syncPromise, tmPromise]).then((arr_arr) => {
      if (!Array.isArray(arr_arr)) return "error";
      arr_arr[1].map((memeUniqueJson: IMeme) => {
        const memeI = new MemeImage(JSON.stringify(memeUniqueJson));
        memeI.image = arr_arr[0].find(
          (img: Image) => img.id === memeUniqueJson.imageId
        );

        const rm = ressources.memes;
        rm.push(memeI);
        console.trace(this);
      });
      console.log(ressources);
      
      if (this.#wrapperDom) {
        for (const child of this.#wrapperDom.children) {
          child.remove();
        }
        this.#wrapperDom.append(this.#memeHandler.nodeDom);
      }

      return [ressources.images, ressources.memes];
    });
  }
}
const app = new App();
