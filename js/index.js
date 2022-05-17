/**
 * fonction d'init
 */
var meme;
var nodeSvg;
var images = [];
function initJs() {
  loadImages();
  document.querySelector("footer").innerHTML = "Orsys &copy; 2022";
  meme = new Meme(renderSvg, saveMeme);
  nodeSvg = document.querySelector("svg");
  addFormUpdateEvent(meme);
}
document.addEventListener("DOMContentLoaded", initJs);
/**
 * remplissage du select du form
 * @param {array<Images>} images liste d'image provennant du REST /images
 */
function fillSelectImage(images) {
  var select = document.forms["meme-editor"]["image"];
  select.childNodes.forEach(function (e) {
    e.remove();
  });
  images.forEach(function (element, index, liste) {
    var opt = document.createElement("option");
    opt.value = element.id;
    opt.innerHTML = element.titre;
    select.append(opt);
  });
}
/**
 * chargement de la liste d'images
 */
function loadImages() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5679/images");
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function (evt) {
    //   gestion de fin d'achevement de recuperation de ressource
    if (evt.target.readyState < XMLHttpRequest.DONE) {
      return;
    }
    //gestion d'erreur
    if (evt.target.status >= 400) {
      console.log("erreur de requete", xhr.status);
      return;
    }
    //traitement
    images = JSON.parse(evt.target.response);
    //console.trace(images);
    fillSelectImage(images);
  };
  xhr.send();
}
/**
 * chargement de la liste d'images
 */
function saveMeme(meme) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5679/memes");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function (evt) {
    //   gestion de fin d'achevement de recuperation de ressource
    if (evt.target.readyState < XMLHttpRequest.DONE) {
      return;
    }
    //gestion d'erreur
    if (evt.target.status >= 400) {
      console.log("erreur de requete", xhr.status);
      return;
    }
    console.log(JSON.parse(evt.target.response));
  };
  xhr.send(JSON.stringify(meme));
}
/**
 * Fonction de render svg d'un meme
 * @param {array} argsCaller tableaux des agrs fournit par le parent
 * @param {Meme} meme instance du meme afficher
 */
function renderSvg(argsCaller, meme) {
  var nodeSvg = argsCaller[0];
  var img = images.find(function (elemImg) {
    return elemImg.id === meme.imageId;
  });
  nodeSvg.getAttributeNode("viewBox").value = "0 0 " + img.w + " " + img.h;
  /*image*/
  var image = nodeSvg.querySelector("image");
  image.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href").value =
    img.url;
  /*text*/
  var text = nodeSvg.querySelector("text");
  // recuperation d'un objet attribut
  text.getAttributeNode("x").value = meme.dimension.x;
  text.getAttributeNode("y").value = meme.dimension.y;
  text.getAttributeNode("text-decoration").value = meme.underline
    ? "uderline"
    : "none";
  /*// creation d'un attribut non existant
  var a = document.createAttributeNS(
    "http://www.w3.org/2000/svg",
    "font-weight"
  );
  a.value = meme.fontWeight;
  text.setAttributeNode(a);*/

  //moddif de la composante de style css en igne de la balise
  text.style.fontWeight = meme.fontWeight;
  //modif direct de la value d'un attribut existant
  text.setAttribute("fill", meme.color);
  text.setAttribute("font-style", meme.italic ? "italic" : "normal");
  text.setAttribute("font-size", meme.fontSize);
  text.innerHTML = meme.text;
}
/**
 * fonction d'ajout des event de changements du formulaire
 * @param {Meme} meme
 */
function addFormUpdateEvent(meme) {
  var f = document.forms["meme-editor"];
  f.addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("soumission du formulaire");
    //enregistrement  REST
    meme.save();
    f.reset();
  });
  f.addEventListener('reset',function(evt){
      
    meme.clear();
    meme.render(nodeSvg);
  })
  f["text"].addEventListener("change", function (evt) {
    meme.text = evt.target.value;
    meme.render(nodeSvg);
  });
  f["image"].addEventListener("change", function (evt) {
    meme.imageId = Number(evt.target.value);
    meme.render(nodeSvg);
  });
  f["color"].addEventListener("change", function (evt) {
    meme.color = evt.target.value;
    meme.render(nodeSvg);
  });
  f["x"].addEventListener("change", function (evt) {
    meme.dimension.x = Number(evt.target.value);
    meme.render(nodeSvg);
  });
  f["y"].addEventListener("change", function (evt) {
    meme.dimension.y = Number(evt.target.value);
    meme.render(nodeSvg);
  });
  f["size"].addEventListener("change", function (evt) {
    meme.fontSize = Number(evt.target.value);
    meme.render(nodeSvg);
  });
  f["weight"].addEventListener("change", function (evt) {
    meme.fontWeight = evt.target.value;
    meme.render(nodeSvg);
  });
  f["underline"].addEventListener("change", function (evt) {
    meme.underline = evt.target.checked;
    meme.render(nodeSvg);
  });
  f["italic"].addEventListener("change", function (evt) {
    meme.italic = evt.target.checked;
    meme.render(nodeSvg);
  });
}
