class Meme {
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
      x: this.dimension.x,
      y: this.dimension.y,
      text: this.text,
      color: this.color,
    });
  }
  #setFormJson(jsonStr) {
    const o = JSON.parse(jsonStr);
    this.id = o.id;
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
}
class Image {
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
const img = new Image();
const loadedImg = new Image({ id: 0, url: "/img" });
console.log(img, loadedImg);
console.log(JSON.stringify(loadedImg));
const meme = new Meme();
meme.color = "#ABCEF0";
// console.log(meme);
meme.color = "#ZE";
// console.log(meme);

/*console.log(meme);*/
/*meme.#timestamp=new Date();
console.log(meme,meme.#timestamp,meme.text);
*/
