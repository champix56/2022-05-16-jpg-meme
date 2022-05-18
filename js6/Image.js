import { REST_ADR } from "./config/config.js";

const lambda = "";
export class Image {
  #_id;
  #_w;
  #_h;
  #_url;
  #_titre;
  constructor(objFromJSON) {
    if (typeof objFromJSON === "object") {
      this.#_h = objFromJSON.h;
      this.#_w = objFromJSON.w;
      this.#_url = objFromJSON.url;
      this.#_titre = objFromJSON.titre;
      this.#_id = objFromJSON.id;
    }
  }
  get id() {
    return this.#_id;
  }
  get titre() {
    return this.#_titre;
  }
  get h() {
    return this.#_h;
  }
  get w() {
    return this.#_w;
  }
  get url() {
    return this.#_url;
  }
}
export class ArrayImages extends Array {
  load() {
    return fetch(`${REST_ADR}/images`)
      .then((f) => f.json())
      .then((a) => {
        this.splice(0);
        a.map((e) => {
          this.push(new Image(e));
        });
        return this;
      });
  }
}
// export const images = new ArrayImages();
// const t = images.load();