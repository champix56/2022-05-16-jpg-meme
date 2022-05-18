import { REST_ADR } from "./config/config.js";
import { Image } from "./Image.js";

export class Meme {
  #id;
  #text;
  #dimension;
  #fontSize;
  #fontWeight;
  #underline;
  #italic;
  #color;
  #imageId;
  #timestamp;
  get text() {
    return this.#text;
  }
  set text(newVal) {
    const regex = /\w*/;
    if (regex.exec(newVal) !== null) {
      this.#text = newVal;
    }
  }
  get x() {
    return this.#dimension.x;
  }
  set x(newVal) {
    if (typeof newVal === "number") {
      this.#dimension.x = newVal;
    }
  }
  get y() {
    return this.#dimension.y;
  }
  set y(newVal) {
    if (typeof newVal === "number") {
      this.#dimension.y = newVal;
    }
  }
  get color() {
    return this.#color;
  }
  set color(newVal) {
    const regex = /^#[0-9a-fA-F]{6}$/;
    if (regex.exec(newVal) !== null) {
      this.#color = newVal;
    } else {
      this.#color = "#000000";
    }
  }
  get fontWeight() {
    return this.#fontWeight;
  }
  set fontWeight(newVal) {
    const regex = /^\d00$/;
    let m;
    if ((m = regex.exec(newVal)) !== null) {
      this.#fontWeight = newVal;
    } else {
      this.#fontWeight = "500";
    }
  }
  get fontSize() {
    return this.#fontSize;
  }
  set fontSize(newVal) {
    if (typeof newVal === "number") {
      this.#fontSize = newVal;
    } else {
      this.#fontSize = 1;
    }
  }
  get italic() {
    return this.#italic;
  }
  set italic(newVal) {
    typeof newVal === "boolean"
      ? (this.#italic = newVal)
      : (this.#italic = false);
  }
  get underline() {
    return this.#underline;
  }
  set underline(newVal) {
    this.#italic = typeof newVal === "boolean" ? newVal : false;
  }
  get imageId() {
    return this.#imageId;
  }
  set imageId(newVal) {
    if (typeof newVal === "number") {
      this.#imageId = newVal;
    } else {
      this.#imageId = -1;
    }
  }
  get id() {
    return this.#id;
  }
  set timestamp(newVal) {
    if (newVal instanceof Date) this.#timestamp = newVal;
    else this.#timestamp = new Date();
  }

  constructor(jsonStr) {
    if (undefined !== jsonStr && typeof jsonStr === "string") {
      this.#setFormJson(jsonStr);
    } else {
      this.#text = "";
      this.#dimension = { x: 0, y: 10 };
      this.#fontSize = 10;
      this.#fontWeight = "900";
      this.#underline = true;
      this.#italic = false;
      this.#color = "#ACACAC";
      this.#imageId = 0;
      this.#timestamp = new Date();
    }
    this.#timestamp = new Date();
  }
  clear() {
    this.text = "";
    this.dimension = { x: 0, y: 10 };
    this.fontSize = 10;
    this.fontWeight = "900";
    this.underline = true;
    this.italic = false;
    this.color = "#000000";
    this.imageId = 0;
    this.#timestamp = new Date();
  }
  json() {
    return JSON.stringify({
      id: this.id,
      imageId: this.imageId,
      underline: this.underline,
      italic: this.italic,
      fontWeight: this.fontWeight,
      fontSize: this.fontSize,
      x: this.x,
      y: this.y,
      text: this.text,
      color: this.color,
    });
  }
  #setFormJson(jsonStr) {
    const o = JSON.parse(jsonStr);
    this.#id = o.id;
    this.#dimension = { x: 0, y: 0 };
    this.x = o.x;
    this.y = o.y;
    this.imageId = o.imageId;
    this.text = o.text;
    this.fontSize = o.fontSize;
    this.fontWeight = o.fontWeight;
    this.color = o.color;
    this.italic = o.italic;
    this.underline = o.underline;
  }
  static newFormJsonObject(obj) {
    const memeOut = new Meme();
    memeOut.#id = obj.id;
    memeOut.#dimension = { x: obj.x, y: obj.y };
    memeOut.imageId = obj.imageId;
    memeOut.text = obj.text;
    memeOut.fontSize = obj.fontSize;
    memeOut.fontWeight = obj.fontWeight;
    memeOut.color = obj.color;
    memeOut.italic = obj.italic;
    memeOut.underline = obj.underline;
    return memeOut;
  }
  /**
   * enregistrement PUT/POST en fonction de l'id
   * @param {Function} callback execution apres enregistrement
   */
  save(callback) {
    fetch(`${REST_ADR}/memes${undefined !== this.#id ? "/" + this.#id : ""}`, {
      method: undefined !== this.#id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: this.json(),
    })
      .then(
        (f) => f.json(),
        (f) => {
          console.error("err de sauvgarde du meme", f);
          return {};
        }
      )
      .then((o) => {
        this.#id = o.id;
        if (callback) {
          callback(this);
        }
      });
  }
}

export class MemeImage extends Meme {
  #image;
  constructor(jsonStr) {
    super(jsonStr);
  }
  get image() {
    return this.#image;
  }
  set image(img) {
    this.imageId = img.id;
    this.#image = img;
  }
  json() {
    let outJson = super.json();
    const o = JSON.parse(outJson);
    o.extended = true;
    return JSON.stringify(o);
  }
}

export class MemeArray extends Array {
  push(memeIn) {
    if (memeIn instanceof MemeImage) {
      super.push(memeIn);
    }
  }
  load() {
    return fetch(`${REST_ADR}/memes`).then((f) => f.json());
    //   .then((a) => {
    //     a.map((e, i) => {
    //       this.push(Meme.newFormJsonObject(e));
    //     });
    //   });
  }
}
//const img = new Image();
//const loadedImg = new Image({ id: 0, url: "/img" });
// console.log(img, loadedImg);
// console.log(JSON.stringify(loadedImg));
// const meme = new MemeImage('{"text":"Hello","x":0,"y":0}');
// meme.image = { id: 0, url: "/" };
// meme.save();
//const am = new MemeArray();
//am.load();
//console.log(am);
//  console.log(meme.json(),meme);
/*console.log(meme);*/
/*meme.#timestamp=new Date();
console.log(meme,meme.#timestamp,meme.text);
*/
