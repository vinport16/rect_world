'use strict'

var Vector = require('./vector.js');
var Rect = require('./rect.js');
var Region = require('./region.js');



var reg = new Region(0,0,0, 100, 100, 100, 1);

var rects = [];

for(var i = 0; i < 1000; i++){
  rects.push(make_rect_in(reg));
  //console.log("rect position: " + rects[rects.length-1].position.toString());
}


for(var idx in rects){
  reg.add_rect(rects[idx]);
}
console.log(reg.toString());
console.log("" + reg.region_count() + " regions");
console.log("" + reg.get_contents().length + " objects");


for(var idx = 0; idx < rects.length/2; idx++){
  reg.remove_rect(rects[idx]);
}
console.log(reg.toString());
console.log("" + reg.region_count() + " regions");
console.log("" + reg.get_contents().length + " objects");


console.log("rects near rect 1: " + reg.get_near(rects[1]).length);






function make_rect_in(region){

  let sx = Math.random()*5;
  let sy = Math.random()*5;
  let sz = Math.random()*5;

  let size = new Vector(sx, sy, sz);

  let xp = Math.random()*(region.size.x-sx) + (region.position.x - (region.size.x-sx)/2);
  let yp = Math.random()*(region.size.y-sy) + (region.position.y - (region.size.y-sy)/2);
  let zp = Math.random()*(region.size.z-sz) + (region.position.z - (region.size.z-sz)/2);
  
  let position = new Vector(xp, yp, zp);

  return(new Rect(position, size));

}