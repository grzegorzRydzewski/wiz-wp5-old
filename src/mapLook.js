import React from 'react';
import './index.css';
import Tile from './maps/tile.js';
import PartyArrow from './partyArrow.js';
export default class MapLook extends React.Component { //mapa
  lookWidth;lookHeight;

  constructor(props) {
    super(props);
    this.lookWidth = 19;
    this.lookHeight = 15;
  }
  renderMap() {
    const board = [];
    let centerX = Math.floor(this.lookWidth/2)  - this.props.party.px;
    let centerY = Math.floor(this.lookHeight/2)  - this.props.party.py;

    for (let y = 0 - centerY;y < this.lookHeight - centerY;y++){
      const tileRows = [];
      for(let x = 0 - centerX;x < this.lookWidth - centerX; x++) {
        if (this.props.party.px === x && this.props.party.py === y ) {
          tileRows.push(this.renderParty(this.props.party.px,this.props.party.py)); // ustawia druzyne

        } else {
            tileRows.push(this.renderTile(x,y));
        }
      }
      board.push(<div className="tile-row" key={"RowKey " + y} >{tileRows}</div>)
    }
    return (
        <div>
          {board}
        </div>
      );
  }
  renderTile(x,y) {
    return (
      <div className="tile" key={"TileDivKey" + x + " " + y} >
        <Tile key={"TileKey" + x + " " + y} x={x} y ={y}
          currentLevel={this.props.currentLevel}
        />
      </div>
    );
  }
  renderParty(x,y) {
    return (

      <div className="party" key="PartyDivKey">
        <div className="tile-under-party">
          <Tile key={"TileKey" + x + " " + y} x={x} y ={y}
            currentLevel={this.props.currentLevel}
            />
        </div>
        <div className="party-on-top-of-tile" >
          <PartyArrow key="PartyArrow" x={this.props.party.px} y={this.props.party.py} facing={this.props.party.pf}/>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="map-look" key="MapLookKey" >
        {this.renderMap()}
      </div>
    );
  }
}
