/**
 * Module dependencies
 */

var names = require('./names');

/**
 * Lighten the given color
 * @param  {String} color hex value
 * @param  {Number} value
 * @return {String}
 */

exports.lighten = function(color, v) {
  v = (v <= 1) ? v*100 : v;
  return tint(color, v);
};

/**
 * Darken the given color
 * @param  {String} color hex value
 * @param  {Number} value
 * @return {String}
 */

exports.darken = function(color, v) {
  v = (v <= 1) ? v*100 : v;
  return tint(color, -v);
};

/**
 * Tint the color by the given value
 *
 * Credits: richard maloney 2006
 *
 * @param {String} color
 * @param {Number} v
 * @return {String}
 */

function tint(color, v) {

  var colors = rgb(color)
    , r = colors[0]
    , g = colors[1]
    , b = colors[2]

  console.log(colors);

  r = Math.abs(colors[0]+v); if (r>255) r=r-(r-255);
  g = Math.abs(colors[1]+v); if (g>255) g=g-(g-255);
  b = Math.abs(colors[2]+v); if (b>255) b=b-(b-255);

  r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
  if (r.length == 1) r = '0' + r;
  g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
  if (g.length == 1) g = '0' + g;
  b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
  if (b.length == 1) b = '0' + b;

  return "#" + r + g + b;
}

/**
 * Hex3 to Hex6
 */

function hex3tohex6(h) {
  return h[0] + h[0]
       + h[1] + h[1]
       + h[2] + h[2];
}

/**
 * return rgb values for `color`.
 *
 * @return {[Number]}
 */

function rgb(color){
  var rgba = [];

  color = names[color] ? names[color] : color;
  var start = color.substring(0, 3);

  if(start.toLowerCase() === 'rgb'){
    var match = color.match(/^rgba?\((\d+)\W+(\d+)\W+(\d+)/i);
    var rgba = match.slice(1).map(function(str){ return parseInt(str, 10) });
    console.log(match, rgba);
  } else {
    color = color.replace(/^#/, '');
    color = (color.length == 3) ? hex3tohex6(color) : color;
    var mix = parseInt(color, 16);
    rgba[0] = ((mix >> 16) & 0xFF);
    rgba[1] = ((mix >> 8) & 0xFF);
    rgba[2] = mix & 0xFF;
  }

  return rgba;
}
