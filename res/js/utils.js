// 数组乱序方法
if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  };
}

// 数组去重
function distinct(arr) {
  var obj = {},
    i = 0,
    len = 0;
  if (Array.isArray(arr) && arr.length > 0) {
    len = arr.length;
    for (i = 0; i < len; i += 1) {
      obj[arr[i]] = arr[i];
    }
    return Object.keys(obj);
  }
  return [];
}

if (!Array.prototype.randomOne) {
  Array.prototype.randomOne = function() {
  	return this[parseInt(Math.random() * this.length)];
  };
}

// 碰撞检测
function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x;
  r1.centerY = r1.y;
  r2.centerX = r2.x;
  r2.centerY = r2.y;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
};


function randomShells(shell, n) {
  n --;
  var shells = [];
  window.shellTypes.map(function(e) {
    e.shells.map(function(i) {
      if (i.img != shell.img) {
        shells.push(i);
      }
    });
  });
  // console.log(shells);
  shells.sort(function() {return 0.5 - Math.random()});
  // console.log(shells);
  shells = shells.slice(0, n);
  shells = shells.concat(shell);
  // console.log(shells);
  // 重排
  return shells.sort(function() {return 0.5 - Math.random()});
};