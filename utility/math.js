//convert degrees to radians
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}


//convert radians to degrees
export function radToDeg(radians) {
  return radians * 180 / Math.PI;
}



//// RANDOM INT ////
//includes min and max
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//// RANDOM FLOAT ////
//includes min and max
export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

  
//// RANDOM COLOR ////
export function randomColor() {
  return `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;
}

  
//// RANDOM ARRAY ELEMENT ////
export function randomElement(inArray) {
 return inArray[Math.floor(Math.random() * inArray.length)];
}