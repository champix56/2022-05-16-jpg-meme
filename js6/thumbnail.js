export class Thumbnail {
  #templateUrl = "/Views/thumbnail.html";
  #rootNode = document.createElement("div");
  constructor() {}
  get rootNode() {
    if (!this.#rootNode.hasChildNodes) {
      this.#initNode();
    }
    return this.#rootNode;
  }
  #initNode() {
    fetch(this.#templateUrl)
      .then((f) => f.text())
      .then((t) => {
        this.#rootNode.innerHTML = t;
      });
  }
}
export class Home {
  #rootNode = document.createElement("div");
  constructor() {}
  get rootNode() {
    if (!this.#rootNode.hasChildNodes) {
      this.#initNode();
    }
    return this.#rootNode;
  }
  #initNode() {
    this.#rootNode.innerHTML = "<h1>Hello</h1>";
  }
}
