var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
  renderer = autoDetectRenderer(windowSize.width, windowSize.height);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` module to load an image
  
var images = shellImages.map(function(e) {return e[0];});
images.push(backgroundImage);

// load image resourse
loader.add(distinct(images)).load(setup);

var textMessage = null;

function setup() {
  createBgImage();
  var shellImage = null;
  for (var i = shellImages.length - 1; i >= 0; i--) {
    shellImage = shellImages[i];
    createShellSprite(shellImage, Math.floor(Math.random() * 800) , Math.floor(Math.random() * 600));
  };
  // 渲染中间的 label
  textMessage = createShellMessage(['...', '0']);
  // TODO，每次随机一个
  updateShellMessage(shellMessages.randomOne());
  // 渲染游戏
  requestAnimationFrame(animate);
}


function createBgImage() {
  var background = new PIXI.Sprite(resources[backgroundImage].texture);
  stage.addChild(background);
}

// 更新 文本信息
function updateShellMessage(shell_message) {
  textMessage.text = shell_message[0];
  textMessage.m = shell_message;
}

function createShellMessage(shell_message) {
  var m = new PIXI.Text(
    shell_message[0], {
      font: 'bold 40px Arial', 
      fill: '#cc00ff', 
      align: 'center', 
      stroke: '#FFFFFF', 
      strokeThickness: 4 
    });
  m.m = shell_message;
  m.anchor.set(0.5);
  m.position.set(windowSize.width / 2, windowSize.height / 2);

  stage.addChild(m);
  return m;
}


function createShellSprite(img, x, y) {
  // create our little bunny friend..
  var shell = new PIXI.Sprite(resources[img[0]].texture);
  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  shell.interactive = true;
  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  shell.buttonMode = true;
  // center the bunny's anchor point
  shell.anchor.set(0.5);
  // make it a bit bigger, so it's easier to grab
  shell.scale.set(3);
  // setup events
  shell
      // events for drag start
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      // events for drag end
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
      // events for drag move
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);

  // move the sprite to its designated position
  shell.position.x = x;
  shell.position.y = y;
  shell.img = img
  // add it to the stage
  stage.addChild(shell);
}

function animate() {
  requestAnimationFrame(animate);
  // render the stage
  renderer.render(stage);
}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  console.log(this.img);
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
  console.log(textMessage.m);
  // console.log(textMessage.x, textMessage.y. textMessage.width, textMessage.height);
  if (this.collision) {
    console.log('collision:', this.img[1]);
  }
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;

    // 碰撞检测
    this.collision = hitTestRectangle(this, textMessage);
  }
}
