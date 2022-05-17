/**
 * fonction d'init
 */
var meme;
var nodeSvg;
function initJs() {
  document.querySelector("footer").innerHTML = "Orsys &copy; 2022";
  meme=new Meme(renderSvg);
  nodeSvg=document.querySelector('svg');
  addFormUpdateEvent(meme);
}
document.addEventListener("DOMContentLoaded", initJs);

function renderSvg(argsCaller, meme) {
 var nodeSvg=argsCaller[0];
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

function addFormUpdateEvent(meme){
    var f=document.forms['meme-editor'];
    f.addEventListener('submit',function(evt){
        evt.preventDefault();
        console.log('soumission du formulaire');
        //enregistrement  REST
    });
    f['text'].addEventListener('change',function(evt){
        meme.text=evt.target.value;
        meme.render(nodeSvg);
    });
    f['color'].addEventListener('change',function(evt){
        meme.color=evt.target.value;
        meme.render(nodeSvg);
    });
    f['x'].addEventListener('change',function(evt){
        meme.dimension.x=Number(evt.target.value);
        meme.render(nodeSvg);
    });
    f['y'].addEventListener('change',function(evt){
        meme.dimension.y=Number(evt.target.value);
        meme.render(nodeSvg);
    });
    f['size'].addEventListener('change',function(evt){
        meme.fontSize=Number(evt.target.value);
        meme.render(nodeSvg);
    });
    f['weight'].addEventListener('change',function(evt){
        meme.weight=evt.target.value;
        meme.render(nodeSvg);
    });
    f['underline'].addEventListener('change',function(evt){
        meme.underline=evt.target.checked;
        meme.render(nodeSvg);
    });
    f['italic'].addEventListener('change',function(evt){
        meme.italic=evt.target.checked;
        meme.render(nodeSvg);
    });
}
