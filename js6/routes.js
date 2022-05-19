import MemeGenerator from "./MemeHandler.js";
import { MemeThumbnailDOM } from "./thumbnail.js";
export default class Routes extends Array {
  static get routes() {
    return Object.assign(new Routes(), [
      { path: "/thumbnail", className:MemeThumbnailDOM },
      { path: "/editor",className: MemeGenerator },
    ]);
  }
}
