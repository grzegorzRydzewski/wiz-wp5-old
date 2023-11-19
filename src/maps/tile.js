import React from 'react';
import '../index.css';
import {imageCollection} from '../assets.js';

export default class Tile extends React.Component {
  x; y;
  miniCanvas;ctx;
  level;faccess;
  tw;th;
  tilesetsTable;
  //unemptyTile; //niepusta
  constructor(props) {
    super(props);
    this.x = props.x;
    this.y = props.y;
    this.level =  props.currentLevel;
    this.faccess = props.currentLevel.getJSON();

    this.tw = this.faccess.tilewidth;
    this.th = this.faccess.tileheight;
    this.tilesetsTable = [];
    for (let i = 0; i < this.faccess.tilesets.length;i++) {
      this.tilesetsTable[i] = require('./' + this.faccess.tilesets[i].source);
    }
  }
  componentDidMount() {
    if (this.miniCanvas === undefined) { //robi sie to raz
      this.miniCanvas = this.refs.miniCanvas;
      this.ctx = this.miniCanvas.getContext("2d");
    }
    this.drawTile();
  }
  componentDidUpdate() {
    this.clearCanvas();
    this.drawTile();
  }
  drawTile() {
    let layers = this.faccess.layers;
    let tileId;
    let tilesetFound;
    let tilesetFile;
    if (this.isUnempty() && ((this.level.isExplored(this.x,this.y) === 1) || (this.level.isGreyed(this.x,this.y) === 1)) // FOG OF WAR czesc pierwsza
      && this.x < this.faccess.width && this.y < this.faccess.height ) {
      for (let i = 0; i < layers.length;i++) {
        if(layers[i].properties.find(el => el.name === "drawable").value === true) {
          tileId = this.level.getTileId(this.x,this.y,layers[i].name);
          tilesetFound = this.findTileset(tileId);
          tileId -= tilesetFound.firstgid;
          tilesetFile = this.findTilesetFile(tilesetFound);
          //console.log(this.isUnempty());
          const sy = Math.floor( tileId / tilesetFile.grid.width );
          const sx = tileId % tilesetFile.grid.width;

          if (this.level.isGreyed(this.x,this.y) === 1 && this.level.isExplored(this.x,this.y) === 0 ) this.ctx.globalAlpha = 0.5;
          else if (this.level.isGreyed(this.x,this.y) === 1 && this.level.isExplored(this.x,this.y) === 1 ) //zaciemnianie
            this.ctx.globalAlpha = 1;


          this.ctx.drawImage(imageCollection[('' + tilesetFound.source + '').slice(0,-5)],
            sx*this.tw, sy*this.th,this.tw,this.th,0,0,this.tw,this.th); //slice obcina .json
        }
      }
    }

  }
  findTilesetFile(tilesetFound) {
    return this.tilesetsTable.find(el => el.name === (tilesetFound.source + '').slice(0,-5));
    //slice obcina .json
  }
  findTileset(tileId) {
    let tilesets = this.faccess.tilesets;
    for (let j = 0; j < tilesets.length;j++) {
      if (j !== tilesets.length - 1 ) {
        if (tileId >= tilesets[j].firstgid && tileId < tilesets[j + 1].firstgid ) {
          return tilesets[j];
        }
      }
      else {
        return tilesets[j];
      }
    }
  }
  isUnempty() {
    let unempty = false;
    this.faccess.layers.forEach((item, i) => {
      if(item.properties.find(el => el.name === "drawable").value === true) {
        if (this.level.getTileId(this.x,this.y,item.name) !== 0 ) unempty = true;
      }
    });
    return unempty;
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.miniCanvas.width, this.miniCanvas.height);
  }
  render() {
    const canvas = <canvas ref="miniCanvas"/>
    return (
      <div>
        {canvas}
      </div>
    );
  }
}
/*
    let tileId; let tilesetPicked; let tilesetPickedFromTable;
    for (let i = 0; i < 2;i++) {  // PROWIZORA! : bierze tylko sciany i podlogi POPRAWIC
      tileId = this.faccess.layers[i].data[this.y*this.faccess.width + this.x];

      if (tileId !== 0 && (this.level.isExplored(this.x,this.y) === 1) // FOG OF WAR czesc pierwsza
        && this.x < this.faccess.width && this.y < this.faccess.height ) {
        //picking tileset
        for (let j = 0; j < this.faccess.tilesets.length;j++) {
          if (j !== this.faccess.tilesets.length - 1 ) {
            if (tileId >= this.faccess.tilesets[j].firstgid && tileId < this.faccess.tilesets[j + 1].firstgid ) {
              tilesetPicked = this.faccess.tilesets[j];
              tilesetPickedFromTable = this.tilesetsTable[j];
              break;
            }
          }
          else {
            tilesetPicked = this.faccess.tilesets[j];
            tilesetPickedFromTable = this.tilesetsTable[j];
          }
        }

        tileId -= tilesetPicked.firstgid;

        const sy = Math.floor( tileId / tilesetPickedFromTable.grid.width );
        const sx = tileId % tilesetPickedFromTable.grid.width;

        //if (this.level.isGreyed(this.x,this.y) === 1) this.ctx.globalAlpha = 0.7;

        this.ctx.drawImage(imageCollection[('' + tilesetPicked.source + '').slice(0,-5)],
          sx*this.tw, sy*this.th,this.tw,this.th,0,0,this.tw,this.th);
          //slice obcina .json
      }
      else { //pusty tile
      }
    }
    */
