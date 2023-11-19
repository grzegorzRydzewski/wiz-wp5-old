import React from 'react';
import ReactDOM from 'react-dom';
import  { createRoot }  from 'react-dom/client';
import './src/index.css';
import {loadinguj} from './src/assets.js';
import Party from './src/party.js';
import MapLook from './src/mapLook.js';
//import KeyboardEventHandler from 'react-keyboard-event-handler';
import canGo from './src/canGo.js';
import Level from './src/level.js';

const dung01map = require('./src/maps/dung01map.json');

var party = new Party(2,2,'E');
var currentLevel = new Level('dung01');
currentLevel.explore(2,2);
currentLevel.greyTiles(2,2);



class Ramka extends React.Component {  // glowne okno gry
  constructor(props) {
    super(props);

    //let party = new Party(2,2,'E');
    //let currentLevel = new Level('dung01');

    this.state = {party: party,currentLevel: currentLevel};
    //this.state.currentLevel.explore(2,2);
    //this.state.currentLevel.greyTiles(2,2);
   //console.log( this.props.onKeyDown);
   //const handler = this.props.onKeyDown;
    this.handleInput = this.handleInput.bind(this);
    var refe;
    
    
  }
  handleInput(e) {
    console.log("df");
   
    let pf = this.state.party.pf;
    let px = this.state.party.px;
    let py = this.state.party.py;
    let key = e.key;
    if (e.repeat === false) {
      if (key === 'up' || key === 'w') {
        if (pf === 'N' && canGo('N') && py >0) this.moveParty(0,-1);
        else if (pf === 'E' && canGo('E')&& px < dung01map.width - 1) this.moveParty(1,0);
        else if (pf === 'S' && canGo('S') && py < dung01map.height - 1) this.moveParty(0,1);
        else if (pf === 'W' && canGo('W') && px >0) this.moveParty(-1,0);

      } else if (key === 'down' || key === 's') {
          if (pf === 'N'  && canGo('S') && py < dung01map.height - 1) this.moveParty(0,1);
          else if (pf === 'E' && canGo('W') && px >0) this.moveParty(-1,0);
          else if (pf === 'S' && canGo('N') && py >0) this.moveParty(0,-1);
          else if (pf === 'W' && canGo('E') && px < dung01map.width - 1) this.moveParty(1,0);
        }
        else if (key === 'right' || key === 'd') this.turnParty('right');
        else if (key === 'left' || key === 'a') this.turnParty('left');

    }
  }
  moveParty (dx,dy) {
    let tempParty = this.state.party;
    let tempLevel = this.state.currentLevel;
    tempParty.px += dx;
    tempParty.py += dy;
    if (!tempLevel.isExplored(tempParty.px,tempParty.py)) {
      tempLevel.explore(tempParty.px,tempParty.py);
      tempLevel.greyTiles(tempParty.px,tempParty.py);

    }
    this.setState({party: tempParty,currentLevel: tempLevel});
    console.log(this.state.currentLevel.isGreyed(tempParty.px + 1,tempParty.py));

  }
  turnParty (turnDirection) {
    let temp = this.state.party;
    if (turnDirection === 'right') {
      if (temp.pf === 'N') temp.pf = 'E';
      else if (temp.pf === 'E') temp.pf = 'S';
      else if (temp.pf === 'S') temp.pf = 'W';
      else if (temp.pf === 'W') temp.pf = 'N';
    } else if (turnDirection === 'left') {
      if (temp.pf === 'N') temp.pf = 'W';
      else if (temp.pf === 'W') temp.pf = 'S';
      else if (temp.pf === 'S') temp.pf = 'E';
      else if (temp.pf === 'E') temp.pf = 'N';
    }
    this.setState({party: temp});
  }
  exploreTiles(goDirection) {

  }
  render() {
    /*
    <KeyboardEventHandler
            handleKeys={['up', 'down', 'left', 'right','w','s','a','d']}
            handleEventType='keydown'
            onKeyEvent={this.handleInput}
          />*/
    
    return (
      
      <div className="ramka" tabIndex="0" autofocus="true" key="ramkaKey" onKeyDown={(e) => {this.handleInput(e)}} >
          <LookWindow party={this.state.party} currentLevel={this.state.currentLevel}  />
      </div>
    );
  }
}
class LookWindow extends React.Component { //wyswietla widok
  render() {
  return (
    <div className="look-window" key="lookWindowKey">
      <MapLook party={this.props.party} currentLevel={this.props.currentLevel}/>


    </div>
    );
  }
}

//========================================
//to zacznie gre po ladowaniu zdjec i tu jest funkcja startGame
Promise.all( loadinguj() ).then( result => {

    startGame();
});
var ramka1 = <Ramka />;
export default function startGame() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(ramka1);
}
export {party,currentLevel};
