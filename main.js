'use strict'

var Vector = require('./vector.js');
var Rect = require('./rect.js');
var Region = require('./region.js');



var reg = new Region(0,0,0, 100, 100, 100, 1);

var rects = [];

for(var i = 0; i < 50; i++){
  rects.push(make_rect_in(reg));
  console.log("rect position: " + rects[rects.length-1].position.toString());
}


for(var idx in rects){
  console.log("adding a rect.");
  reg.add_rect(rects[idx]);
  console.log("new reg state:");
  console.log(reg.toString());
  console.log("--------------------------");
}












function make_rect_in(region){

  let sx = Math.random()*3;
  let sy = Math.random()*3;
  let sz = Math.random()*3;

  let size = new Vector(sx, sy, sz);

  let xp = Math.random()*(region.size.x-sx) - (region.position.x + (region.size.x-sx)/2);
  let yp = Math.random()*(region.size.y-sy) - (region.position.y + (region.size.y-sy)/2);
  let zp = Math.random()*(region.size.z-sz) - (region.position.z + (region.size.z-sz)/2);
  
  let position = new Vector(xp, yp, zp);

  return(new Rect(position, size));

}