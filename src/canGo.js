import {party} from '../index.js';
import {currentLevel} from '../index.js';
const wallsTileset = require('./maps/dungWallsTileset.json');

export default function canGo(goDirection) {
  let wallNo;
  for (let i = 0;i < wallsTileset.tiles.length;i++) { //to skasowac jak blob bedzie pelny!
    if (wallsTileset.tiles[i].id === currentLevel.getWallId(party.px,party.py)) {
      wallNo = i;
      break;
    }
  }

  let canGo = true;
  if (goDirection === 'N') {
    if (wallsTileset.tiles[wallNo].properties[1].value === false ) canGo = false;
  }
  else if (goDirection === 'E') {
    if (wallsTileset.tiles[wallNo].properties[0].value === false ) canGo = false;
  }
  else if (goDirection === 'S') {
    if (wallsTileset.tiles[wallNo].properties[2].value === false ) canGo = false;
  }
  else if (goDirection === 'W') {
    if (wallsTileset.tiles[wallNo].properties[3].value === false ) canGo = false;
  }
  return canGo;
}
