'use strict'

module.exports = class Vector{
  
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone(){
    return( new Vector(x, y, z) );
  }

  toString(){
    return(`[${this.x}\t${this.y}\t${this.z}]`);
  }

}