const lambda="";
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
