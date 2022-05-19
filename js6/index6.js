import {   MemeImage } from "./Meme6.js";
// import MemeGenerator from "./MemeHandler.js";
import ressources from "./ressuorces/ressources.js";
import Routes from "./routes.js";

class App {
  #routes;
  #currenManager;
  constructor() {
    this.#routes = Routes.routes;
    console.log(ressources);
  }
  mountRouteComponent() {
    const currentClass = this.#routes.find(
      (r) => r.path === window.location.pathname
    ).className;
    this.#currenManager = new currentClass();
    document.querySelector("#wrapper").replaceWith(this.#currenManager.domNode);
  }
  loadInitial() {
    document.addEventListener("DOMContentLoaded", (evt) => {

        document.querySelector('#a-editor').addEventListener('click',(evt)=>{
            evt.preventDefault();
            window.history.pushState(undefined,'','/editor');
            this.mountRouteComponent();
        })
        document.querySelector('#a-thumbnail').addEventListener('click',(evt)=>{
            evt.preventDefault();
            window.history.pushState(undefined,'','/thumbnail');
            this.mountRouteComponent();
        })


      const prImages = ressources.images.load();
      const prMemes = ressources.memes.load();
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
          ressources.memes.push(memeI);
          console.trace(this);
          return { memes: ressources.memes, images: ressources.images };
        });
        this.mountRouteComponent();
      });
    });
  }
}
const app = new App();
app.loadInitial();
