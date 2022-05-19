import { MemeArray, MemeImage, MemeImageDOM } from "./Meme6.js";
import { ArrayImages } from "./Image.js";
import ressources from "./ressources.js";

class MemeGenerator {
  #current=new MemeImageDOM();
  constructor() {}
  get currentMeme() {
    return this.#current;
  }
}
export class MemeGenratorDOM extends MemeGenerator {
  #templateUrl = "/Views/editor.html";
  #nodeDom=document.createElement('div');
  #svgNode;
  #form;
  set svgNode(newVal){ this.#svgNode=newVal}
  set form(newVal){ this.#form=newVal}
  constructor() {
    super();
  }
  get nodeDom(){
      if(!this.#nodeDom.hasChildNodes()){this.initNode()}
      return this.#nodeDom;
  }
  initNode() {
    fetch(this.#templateUrl)
      .then((f) => f.text())
      .then((t) => {
        this.#nodeDom.innerHTML=t;
        this.#form = this.#nodeDom.querySelector("form");
        this.#svgNode = this.#nodeDom.querySelector("svg");
        console.log(this.#nodeDom,this.#svgNode)
        this.addFormUpdateEvent();
        this.#fillSelectImage();

        this.refreshForm();        this.render();
      });
  }
  /**
   * remplissage du select du form
   * @param {array<Images>} images liste d'image provennant du REST /images
   */
  #fillSelectImage(images) {
    var select = this.#form["image"];
    select.childNodes.forEach( (e)=> {
      e.remove();
    });
    ressources.images.forEach( (element)=> {
      var opt = document.createElement("option");
      opt.value = element.id;
      opt.innerHTML = element.titre;
      select.append(opt);
    });
  }
  render() {
   (new MemeImageDOM( this.currentMeme)).render(this.#svgNode);
  }
  refreshForm() {
    var f = this.#form;
    f["text"].value = this.currentMeme.text;
    f["color"].value = this.currentMeme.color;
    f["image"].value = this.currentMeme.imageId;
    f["x"].value = this.currentMeme.x;
    f["y"].value = this.currentMeme.y;
    f["weight"].value = this.currentMeme.fontWeight;
    f["size"].value = this.currentMeme.fontSize;
    f["underline"].checked = this.currentMeme.underline;
    f["italic"].checked = this.currentMeme.italic;
  }
  addFormUpdateEvent() {
    var f = this.#form;
    f.addEventListener("submit",  (function(evt) {
      evt.preventDefault();
      console.log("soumission du formulaire");
      //enregistrement  REST
      this.currentMeme.save();
      f.reset();
    }).bind(this));
    f.addEventListener('reset',(evt)=>{
      evt.preventDefault();
      this.currentMeme.clear();
      this.currentMeme.render(this.#svgNode);
      refreshForm(this.currentMeme);
    })
    f["text"].addEventListener("change",  (evt)=> {
        this.currentMeme.text = evt.target.value;
        this.currentMeme.render(this.#svgNode);
    });
    f["image"].addEventListener("change", (evt)=>{
        this.currentMeme.imageId = Number(evt.target.value);
      this.currentMeme.render(this.#svgNode);
    });
    f["color"].addEventListener("change", (evt)=>{
      this.currentMeme.color = evt.target.value;
      this.currentMeme.render(this.#svgNode);
    });
    f["x"].addEventListener("change", (evt)=>{
      this.currentMeme.x = Number(evt.target.value);
      this.currentMeme.render(this.#svgNode);
    });
    f["y"].addEventListener("change", (evt)=>{
      this.currentMeme.y = Number(evt.target.value);
      this.currentMeme.render(this.#svgNode);
    });
    f["size"].addEventListener("change", (evt)=>{
      this.currentMeme.fontSize = Number(evt.target.value);
      this.currentMeme.render(this.#svgNode);
    });
    f["weight"].addEventListener("change", (evt)=>{
      this.currentMeme.fontWeight = evt.target.value;
      this.currentMeme.render(this.#svgNode);
    });
    f["underline"].addEventListener("change", (evt)=>{
      this.currentMeme.underline = evt.target.checked;
      this.currentMeme.render(this.#svgNode);
    });
    f["italic"].addEventListener("change", (evt)=>{
      this.currentMeme.italic = evt.target.checked;
      this.currentMeme.render(this.#svgNode);
    });
  }
  
}
// export const memeGenerator = new MemeGenerator();
// memeGenerator.loadInitial();
