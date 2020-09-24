'use strict'

var Vector = require('./vector.js');

module.exports = class Rect{
  
  constructor(position, size){
    this.position = position;
    this.size = size;
  }

  clone(){
    return( new Rect(position.clone(), size.clone()) );
  }

}