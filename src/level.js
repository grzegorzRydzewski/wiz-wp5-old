export default class Level {
  levelJSON; configFile;
  dungWallsTileset;
  constructor(name) {
    this.levelJSON = require('./maps/' + name + 'map.json');
    this.configFile = require('./config.json');
    this.dungWallsTileset = require('./maps/dungWallsTileset.json');
  }
  getJSON() {
    return this.levelJSON;
  }

  getLevel(name) {
    return require('./maps/' + name + 'map.json');
  }

  getCurrentLevel() {
    return this.levelJSON;
  }
  getTileId(x,y,layer) {
    return this.levelJSON.layers.find(el => el.name === layer).data[y*(this.levelJSON.width) + x]
  }
  getFloorId(x,y) {
    return this.levelJSON.layers.find(el => el.name === "floors").data[y*(this.levelJSON.width) + x]
  }
  getWallId(x,y) {
    if (this.levelJSON.layers.find(el => el.name === "walls").data[y*(this.levelJSON.width) + x] !== 0)
      return this.levelJSON.layers.find(el => el.name === "walls").data[y*(this.levelJSON.width) + x]
        - this.levelJSON.tilesets[1].firstgid;
    else return 0;
  }
  isExplored(x,y) {
    if (this.configFile.fogofwar === true)
      return this.levelJSON.layers.find(el => el.name === "explored").data[y*(this.levelJSON.width) + x];
    else return 1;
  }
  explore(x,y) {
    this.levelJSON.layers.find(el => el.name === "explored").data[y*(this.levelJSON.width) + x] = 1;
  }
  isGreyed(x,y) {
    return this.levelJSON.layers.find(el => el.name === "greyed").data[y*(this.levelJSON.width) + x];
  }
  greyTiles(x,y) {
    let data = this.levelJSON.layers.find(el => el.name === "greyed").data;
    if (this.canGrey(x,y,'North')) data[(y - 1)*(this.levelJSON.width) + x] = 1;
    if (this.canGrey(x,y,'East')) data[y*(this.levelJSON.width) + (x + 1)] = 1;
    if (this.canGrey(x,y,'South')) data[(y + 1)*(this.levelJSON.width) + x] = 1;
    if (this.canGrey(x,y,'West')) data[y*(this.levelJSON.width) + (x -1)] = 1;

    if (this.canGrey(x,y + 1,'East') && this.canGrey(x + 1,y,'South'))
      data[(y + 1)*(this.levelJSON.width) + (x + 1)] = 1;
    if (this.canGrey(x,y + 1,'West') && this.canGrey(x - 1,y,'South'))
      data[(y + 1)*(this.levelJSON.width) + (x -1)] = 1;
    if (this.canGrey(x - 1,y,'North') && this.canGrey(x,y - 1,'West'))
      data[(y - 1)*(this.levelJSON.width) + (x - 1)] = 1;
    if (this.canGrey(x,y - 1,'East') && this.canGrey(x + 1,y,'North'))
      data[(y - 1)*(this.levelJSON.width) + (x + 1)] = 1;

  }
  canGrey(x,y,canGo) {
    return this.dungWallsTileset.tiles.find(el => el.id ===  this.getWallId(x,y)).properties.
      find(el => el.name ===  ('canGo' + canGo) ).value;
  }
}
