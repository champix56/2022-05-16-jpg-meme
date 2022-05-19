import { VIEW_DIR } from "./config/config.js";
import ressources from "./ressuorces/ressources.js";

export class MemeThumbnailDOM {
  #templateUrl = "thumbnail.html";
  #images;
  #memes;
  #domNode;
  #svgBase;
  constructor() {
    this.#svgBase = document.createElement("div");
    this.#domNode = document.createElement("div");
    this.#domNode.id = "wrapper";
  }

  get domNode() {
    if (this.#domNode.childElementCount === 0) {
      this.#loadTemplate();
    }
    return this.#domNode;
  }
  #loadTemplate() {
    fetch(`${VIEW_DIR}${this.#templateUrl}`)
      .then((t) => t.text())
      .then((ht) => {
        this.#domNode.innerHTML = ht;
        this.#svgBase = this.#domNode.querySelector("svg");
        this.#svgBase.remove();
        this.refresh();
      });
  }
  refresh() {
    const thumb = this.#domNode.querySelector("#thumbnail");
    thumb.innerHTML = "";
    ressources.memes.map((e) => {
      const svgContainer = document.createElement("div");
      const svgNode = this.#svgBase.cloneNode(true);
      e.render(svgNode);
      svgContainer.append(svgNode);
      thumb.append(svgContainer);
    });

    console.log(this.#domNode, this.#domNode.children);
  }
}
