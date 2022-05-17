function Meme(renderCallback, saveCallback) {
  this.text = "un text de meme";
  this.dimension = { x: 0, y: 10 };
  this.fontSize = 10;
  this.fontWeight = "900";
  this.underline = true;
  this.italic = false;
  this.color = "#ACACAC";
  this.imageId = 0;
  // this.image = {
  //   id: 0,
  //   url: "/img/meme/futurama.webp",
  //   w: 760,
  //   h: 364,
  // };
  this.clear = function () {
    this.text = "";
    this.dimension = { x: 0, y: 10 };
    this.fontSize = 10;
    this.fontWeight = "900";
    this.underline = true;
    this.italic = false;
    this.color = "#000000";
    this.imageId = 0;
  };
  this.save = function () {
    return saveCallback(this, arguments);
  };
  this.render = function () {
    return renderCallback(arguments, this);
  };
}
