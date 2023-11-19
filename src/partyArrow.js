import React from 'react';
import {imageCollection} from './assets.js';

export default class PartyArrow extends React.Component {
  miniCanvas;ctx;
  componentDidMount() {
    if (this.miniCanvas === undefined) { //robi sie to raz
      this.miniCanvas = this.refs.miniCanvas;
      this.ctx = this.miniCanvas.getContext("2d");
    }
    this.clearCanvas();
    if (this.props.facing === 'N') { this.ctx.drawImage(imageCollection['arrows3232'], 0, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'E') {this.ctx.drawImage(imageCollection['arrows3232'], 32, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'S') {this.ctx.drawImage(imageCollection['arrows3232'], 64, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'W') {this.ctx.drawImage(imageCollection['arrows3232'], 96, 0,32,32,0,0,32,32); }

  }
  componentDidUpdate() {
    this.clearCanvas();
    if (this.props.facing === 'N') { this.ctx.drawImage(imageCollection['arrows3232'], 0, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'E') {this.ctx.drawImage(imageCollection['arrows3232'], 32, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'S') {this.ctx.drawImage(imageCollection['arrows3232'], 64, 0,32,32,0,0,32,32); }
    else if (this.props.facing === 'W') {this.ctx.drawImage(imageCollection['arrows3232'], 96, 0,32,32,0,0,32,32); }
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.miniCanvas.width, this.miniCanvas.height);
  }

  render () {
    return (
      <div>
        <canvas ref="miniCanvas"/>
      </div>
    );
  }
}
