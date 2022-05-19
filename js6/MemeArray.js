import { REST_ADR } from "./config/config.js";
import { MemeImage } from "./Meme6.js";

export class MemeArray extends Array {
    constructor(){super()}
  push(memeIn) {
    if (memeIn instanceof MemeImage) {
      super.push(memeIn);
    }
  }
  load() {
    return fetch(`${REST_ADR}/memes`).then((f) => f.json());
  }
}