import { MemeArray, MemeImage, Meme } from "./Meme6.js";
import { ArrayImages } from "./Image.js";

export class MemeGenerator {
  #memes;
  #images;
  #current;
  constructor() {
    this.#images = new ArrayImages();
    this.#memes = new MemeArray();
    this.#current = new Meme();
  }
  loadInitial(clbk) {
    const prImages = this.#images.load();
    const prMemes = this.#memes.load();
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
      if (!Array.isArray(arr_arr)) return {};
      console.log(arr_arr);
      arr_arr[1].map((memeUniqueJson) => {
        const memeI = new MemeImage(JSON.stringify(memeUniqueJson));
        memeI.image = arr_arr[0].find(
          (img) => img.id === memeUniqueJson.imageId
        );
        this.#memes.push(memeI);
        console.trace(this);
        return { memes: this.#memes, images: this.#images };
      });
    });
  }
  get images() {
    return this.#images;
  }
  get current() {
    return this.#current;
  }
  get memes() {
    return this.#memes;
  }
}
export default class MemeGenDOM extends MemeGenerator {
  constructor(svgNode, form) {
    super();
    this.svgNode = svgNode;
    this.form = form;
  }
  renderCurrent() {
    console.log(this.current);
    var img = this.images.find((elemImg) => {
      return elemImg.id === this.current.imageId;
    });
    //   nodeSvg.getAttributeNode("viewBox").value = "0 0 " + img.w + " " + img.h;
    this.svgNode.getAttributeNode("viewBox").value = `0 0 ${
      img ? img.w : "1000"
    } ${img ? img.h : "1000"}`;
    /*image*/
    var image = this.svgNode.querySelector("image");
    image.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href").value = img
      ? img.url
      : "";
    /*text*/
    var text = this.svgNode.querySelector("text");
    // recuperation d'un objet attribut
    text.getAttributeNode("x").value = this.current.x;
    text.getAttributeNode("y").value = this.current.y;
    text.getAttributeNode("text-decoration").value = this.current.underline
      ? "underline"
      : "none";
    //moddif de la composante de style css en igne de la balise
    text.style.fontWeight = this.current.fontWeight;
    //modif direct de la value d'un attribut existant
    text.setAttribute("fill", this.current.color);
    text.setAttribute("font-style", this.current.italic ? "italic" : "normal");
    text.setAttribute("font-size", this.current.fontSize);
    text.innerHTML = this.current.text;
  }
  initFormEvents() {
    var f = this.form;
    f.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("soumission du formulaire");
      //enregistrement  REST
      console.log(this);
      this.current.save();
      f.reset();
    });
    f.addEventListener("reset", (evt) => {
      evt.preventDefault();
      this.current.clear();
      this.renderCurrent(nodeSvg);
      this.refreshForm();
    });
    f["text"].addEventListener("change", (evt) => {
      this.current.text = evt.target.value;
      this.renderCurrent();
    });
    f["image"].addEventListener("change", (evt) => {
      this.current.imageId = Number(evt.target.value);
      this.renderCurrent();
    });
    f["color"].addEventListener("change", (evt) => {
      this.current.color = evt.target.value;
      this.renderCurrent();
    });
    f["x"].addEventListener("change", (evt) => {
      this.current.x = Number(evt.target.value);
      this.renderCurrent();
    });
    f["y"].addEventListener("change", (evt) => {
      this.current.y = Number(evt.target.value);
      this.renderCurrent();
    });
    f["size"].addEventListener("change", (evt) => {
      this.current.fontSize = Number(evt.target.value);
      this.renderCurrent();
    });
    f["weight"].addEventListener("change", (evt) => {
      this.current.fontWeight = evt.target.value;
      this.renderCurrent();
    });
    f["underline"].addEventListener("change", (evt) => {
      this.current.underline = evt.target.checked;
      this.renderCurrent();
    });
    f["italic"].addEventListener("change", (evt) => {
      this.current.italic = evt.target.checked;
      this.renderCurrent();
    });
  }
  refreshForm() {
    var f = this.form;
    f["text"].value = this.current.text;
    f["color"].value = this.current.color;
    f["image"].value = this.current.imageId;
    f["x"].value = this.current.x;
    f["y"].value = this.current.y;
    f["weight"].value = this.current.fontWeight;
    f["size"].value = this.current.fontSize;
    f["underline"].checked = this.current.underline;
    f["italic"].checked = this.current.italic;
  }
  loadInitial() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initFormEvents();
    });
    return super.loadInitial().then((origin) => {
      this.#fillSelectImage();
      this.refreshForm();
      this.renderCurrent();
      return origin;
    });
  }
  #fillSelectImage() {
    var select = this.form["image"];
    select.childNodes.forEach(function (e) {
      e.remove();
    });
    this.images.map(function (element, index, liste) {
      var opt = document.createElement("option");
      opt.value = element.id;
      opt.innerHTML = element.titre;
      select.append(opt);
    });
  }
}
