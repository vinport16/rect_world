'use strict'

var Vector = require('./vector.js');
var Rect = require('./rect.js');
var Region = require('./region.js');


var $MAX_OCCUPANCY = 8;
var $MAX_DEPTH = 6;
// max # of regions = 8^$MAX_DEPTH
 

module.exports = class Region{
  
  constructor(x, y, z, width, height, depth, tree_depth){
    this.position = new Vector(x, y, z);
    this.size = new Vector(width, height, depth);

    this.contents = [];
    this.zones = null;

    this.depth = tree_depth;
  }

  add_rect(rect){
    if(this.zones){
      let zs = this.in_which_zones(rect);
      for(let n in zs){
        console.log("PLACED IN ZONE: " + zs[n]);
        this.zones[zs[n][0]][zs[n][1]][zs[n][2]].add_rect(rect);
      }
    }else if(this.contents.length >= $MAX_OCCUPANCY && this.depth < $MAX_DEPTH){
      console.log("!!SPLIT!!");
      this.split();
      this.add_rect(rect);
    }else{
      console.log("nosplit: l=" + this.contents.length + ", d=" + this.depth);
      this.contents.push(rect);
    }
  }

  split(){

  let contents = this.contents;
  // clear contents: this is now a segmented region
  this.contents = null; 
  
  let px = this.position.x - this.size.x/4;
  let py = this.position.y - this.size.y/4;
  let pz = this.position.z - this.size.z/4;

  let width = this.size.x/2;
  let height = this.size.y/2;
  let depth = this.size.z/2;

  let d = this.depth + 1;

  this.zones = [[[new Region(-px, -py, -pz, width, height, depth, d), new Region(-px, -py, pz, width, height, depth, d)],
            [new Region(-px, py, -pz, width, height, depth, d), new Region(-px, py, pz, width, height, depth, d)]],
           [[new Region(px, -py, -pz, width, height, depth, d), new Region(px, -py, pz, width, height, depth, d)],
            [new Region(px, py, -pz, width, height, depth, d), new Region(px, py, pz, width, height, depth, d)]]];
  
  // so, zones[1][0][1] = octant +x, -y, +z

  for(var idx in contents){
    this.add_rect(contents[idx]);
  }

}

  // rect: a rectangle object (with position and size)
  // returns: a list of octants that it is in:
  //         ex. [[0,0,1],[0,1,1]] (this rect is in -x,-y,+z and -x,+y,+z)
  in_which_zones(rect){
    let zones = [];
    if(rect.position.x - rect.size.x/2 < this.position.x){ // -x
      if(rect.position.y - rect.size.y/2 < this.position.y){ // -y
        if(rect.position.z - rect.size.z/2 < this.position.z){ // -z
          zones.push([0,0,0]);
        }
        if(rect.position.z + rect.size.z/2 > this.position.z){ // +z
          zones.push([0,0,1]);
        }
      }
      if(rect.position.y + rect.size.y/2 > this.position.y){ // +y
        if(rect.position.z - rect.size.z/2 < this.position.z){ // -z
          zones.push([0,1,0]);
        }
        if(rect.position.z + rect.size.z/2 > this.position.z){ // +z
          zones.push([0,1,1]);
        }
      }
    }
    if(rect.position.x + rect.size.x/2 > this.position.x){ // +x
      if(rect.position.y - rect.size.y/2 < this.position.y){ // -y
        if(rect.position.z - rect.size.z/2 < this.position.z){ // -z
          zones.push([1,0,0]);
        }
        if(rect.position.z + rect.size.z/2 > this.position.z){ // +z
          zones.push([1,0,1]);
        }
      }
      if(rect.position.y + rect.size.y/2 > this.position.y){ // +y
        if(rect.position.z - rect.size.z/2 < this.position.z){ // -z
          zones.push([1,1,0]);
        }
        if(rect.position.z + rect.size.z/2 > this.position.z){ // +z
          zones.push([1,1,1]);
        }
      }
    }
    console.log("rect is in zones: " + zones.join(", "));
    return zones;
  }

  remove_rect(rect){
    if(this.zones){
      // pass removal to next level
      // check if all levels below have < max occupancy
      //    -> merge them back together
    }else{
       idx = contents.findIndex( function f(x){return(x == rect)} );
       contents.splice(idx,1);
    }
  }

  get_near(point, size){

  }

  type(){
    return(Region);
  }

  get_octants(){
    if(this.zones){
      return [this.zones[0][0][0],
              this.zones[0][0][1],
              this.zones[0][1][0],
              this.zones[0][1][1],
              this.zones[1][0][0],
              this.zones[1][0][1],
              this.zones[1][1][0],
              this.zones[1][1][1]];
    }else{
      return [];
    }
  }

  toString(){
    if(this.zones){
      return("[\n" + this.get_octants().join("") + "]\n");
    }else{
      return(" ".repeat(this.depth-1) + "[" + this.contents.length + "]\n");
    }
  }

}