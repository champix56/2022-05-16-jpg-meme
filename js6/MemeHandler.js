import {MemeImage, Meme } from "./Meme6.js";
import { VIEW_DIR } from "./config/config.js";
import ressources from "./ressuorces/ressources.js";

export class MemeGenerator {
  #current;

  constructor() {
    this.#current = new Meme();
  }
  
  get current() {
    return this.#current;
  }
  set current(newVal) {
    if (newVal instanceof Meme || newVal instanceof MemeImage) {
      this.#current = newVal;
    }
  }
}
export default class MemeGenDOM extends MemeGenerator {
  #templateFileName = "editor.html";
  #editorNode;
  #svgNode;
  #form;
  constructor(images, memes) {
    super();
    /*this.svgNode = svgNode;
    this.form = form;*/
    this.#editorNode = document.createElement("div");
    this.#editorNode.id = "wrapper";
  }

  renderCurrent() {
      this.current.render(this.#svgNode)
   
  }
  initFormEvents() {
    var f = this.#form;
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
    var f = this.#form;
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
  get domNode() {
    if (this.#editorNode.childElementCount === 0) {
      this.#editorNodeinit();
    }
    return this.#editorNode;
  }
  #editorNodeinit() {
    fetch(`${VIEW_DIR}${this.#templateFileName}`)
      .then((fh) => fh.text())
      .then((h) => {
        this.#editorNode.innerHTML = h;
        this.#form = this.#editorNode.querySelector("form");
        this.#svgNode = this.#editorNode.querySelector("svg");
        this.initFormEvents();
        this.#fillSelectImage();
        this.refreshForm();
        this.renderCurrent();
      });
  }
  #fillSelectImage() {
    var select = this.#form["image"];
    select.childNodes.forEach(function (e) {
      e.remove();
    });
    ressources.images.map(function (element) {
      var opt = document.createElement("option");
      opt.value = element.id;
      opt.innerHTML = element.titre;
      select.append(opt);
    });
  }
}
