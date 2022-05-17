/**
 * fonction d'init
 */
function initJs() {
  document.querySelector("footer").innerHTML = "Orsys &copy; 2022";
}
document.addEventListener("DOMContentLoaded", initJs);
var meme = new Meme();
function renderSvg(nodeSvg, meme) {
  nodeSvg.getAttributeNode("viewBox").value =
    "0 0 " + meme.image.w + " " + meme.image.h;
  /*image*/
  var image = nodeSvg.querySelector("image");
  image.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href").value =
    meme.image.url;
  /*text*/
  var text = nodeSvg.querySelector("text");
  // recuperation d'un objet attribut
  text.getAttributeNode("x").value = meme.dimension.x;
  text.getAttributeNode("y").value = meme.dimension.y;
  text.getAttributeNode("text-decoration").value = meme.underline
    ? "uderline"
    : "none";
  // creation d'un attribut non existant
  var a = document.createAttributeNS(
    "http://www.w3.org/2000/svg",
    "font-weight"
  );
  a.value = meme.fontWeight;
  text.setAttributeNode(a);
  //modif direct de la value d'un attribut existant
  text.setAttribute("fill", meme.color);
  text.setAttribute("font-style", meme.italic?'italic':'normal');
  text.setAttribute("font-size", meme.fontSize);
  text.innerHTML = meme.text;
}
renderSvg(document.querySelector("svg"), meme);
