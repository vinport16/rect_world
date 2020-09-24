'use strict'

var Structure = require('./structure.js');

module.exports = class Game{
  constructor(id){
    this.id = id;
    this.structure = new Structure("vincent");
  }

  print_id(){
    console.log("my id is "+this.id+" and my structure is "+this.structure.name);
  }

}

