import ressources from "./ressources.js";
import IMeme from "./interfaces/meme.js";
import { MemeArray, MemeImage } from "./Meme6.js";
import { ArrayImages, Image } from "./Image.js";
import { MemeGenratorDOM } from "./MemeHandler.js";
import { Home, Thumbnail } from "./thumbnail.js";
class App {
  #wrapperDom: HTMLElement | null = null;
  #memeHandler: any;
  constructor() {
    this.#memeHandler = undefined; //new MemeGenratorDOM();
    document.addEventListener("DOMContentLoaded", (evt: Event) => {
      this.#wrapperDom = document.querySelector("#wrapper");
      this.initLoading();
      for (const route of routes.routes) {
        document
          .querySelector('a[href="' + route.path + '"]')
          ?.addEventListener("click", (evt) => {
            evt.preventDefault();
            this.#mountView(route);
          });
      }
    });
  }
  #mountView(route: { path: string; manager?: any }) {
    history.pushState(undefined, "", route.path);
    const manager = routes.route(route.path)?.manager;
    this.#memeHandler = new manager();
    if (this.#wrapperDom) this.#wrapperDom.innerHTML = "";
    console.log(this.#wrapperDom);
    this.#wrapperDom?.append(this.#memeHandler.nodeDom);
    console.log(this.#wrapperDom?.children);
  }
  initLoading(): Promise<[ArrayImages, MemeArray] | string> {
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
      if (!Array.isArray(arr_arr)) return "error";
      arr_arr[1].map((memeUniqueJson: IMeme) => {
        const memeI = new MemeImage(JSON.stringify(memeUniqueJson));
        memeI.image = arr_arr[0].find(
          (img: Image) => img.id === memeUniqueJson.imageId
        );

        const rm = ressources.memes;
        rm.push(memeI);
        console.trace(this);
      });
      console.log(ressources);

      // if (this.#wrapperDom) {
      //   for (const child of this.#wrapperDom.children) {
      //     child.remove();
      //   }
      //   this.#wrapperDom.append(this.#memeHandler.nodeDom);
      // }
      const r = routes.route(location.pathname);
      if (r) {
        this.#mountView(r);
      }
      return [ressources.images, ressources.memes];
    });
  }
}
class Route {
  #route: Array<{ path: string; manager?: any }> = [];
  constructor() {
    this.#route.push({ path: "/", manager: Home });
    this.#route.push({ path: "/editor", manager: MemeGenratorDOM });
    this.#route.push({ path: "/thumbnail", manager: Thumbnail });
  }
  get routes() {
    return this.#route;
  }
  route(path: string): { path: string; manager?: any } | undefined {
    return this.#route.find((e) => e.path === path);
  }
}
const routes = new Route();
const app = new App();
