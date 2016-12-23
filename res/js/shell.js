var Container = PIXI.Container,
  DisplayObjectContainer = PIXI.DisplayObjectContainer,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

var currentScene = 'index'; // index, shell, select, success, fail

var stage = new Container(),
  bgContainer = new DisplayObjectContainer(), // 背景效果
  indexScene = new Container(), // 首页屏保场景
  shellScene = new Container(), // 贝壳场景，18 个贝壳选择其中的一个，开始游戏
  selectScene = new Container(), // 游戏选择场景，从随机的贝壳中选中正确的一个
  
  renderer = autoDetectRenderer(screenSize.width, screenSize.height);


renderer.view.style.position = "absolute"
renderer.view.style.width = screenSize.width + "px";
renderer.view.style.height = screenSize.height + "px";
renderer.view.style.display = "block";

stage.addChild(bgContainer);

// 返回按钮
var backBtn = new PIXI.Text(
  '返回', {
    font: 'bold 30px TianZhen', 
    fill: '#fff', 
    align: 'center', 
    // stroke: '#fff', 
    // strokeThickness: 1 
  });
backBtn.anchor.set(1, 1);
backBtn.alpha = 0;
backBtn.position.set(window.screenSize.width - 30, window.screenSize.height - 30);
backBtn.interactive = true;
backBtn.buttonMode = true;
backBtn.on('mousedown', function(event) {
  this.alpha = 0.5;
}).on('mouseup', function() {
  this.alpha = 1;
  gotoShellScene();
});

stage.addChild(backBtn);

document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` module to load an image
var images_resource = [];
window.shellTypes.map(function(e) {
  images_resource = images_resource.concat(e.shells.map(function(s) { return s.img; }))
});
// 添加背景特效资源
images_resource = images_resource.concat(
  [backgroundImage, 'res/img/displacement_map.jpg', 'res/img/zeldaWaves.png']
);

// load image resourse
loader.add(distinct(images_resource)).load(setup);

// 每一个分类为一个 Container，便于统一动画处理。
var shellTypeContainers = [];

var textMessage, displacementFilter, displacementTexture,
  bgOverlay, count = 0;

function setup() {
  // 创建背景
  bgContainer = createBgImage();
  // 游戏首页
  // createIndexContainer();
  // 18 个贝壳场景
  shellTypeContainers = createShellTypeContainers();
  // 游戏选择场景
  // createSelectContainer();

  requestAnimationFrame(animate);
}

function createIndexContainer() {
  indexScene.interactive = true;
  indexScene.buttonMode = true;
  indexScene.width = window.screenSize.width;
  indexScene.height = window.screenSize.height;

  stage.addChild(indexScene);

  indexScene.on('mousedown', function(event) {
  }).on('mouseup', function() {
    console.log('index -> shell');
    gotoShellScene();
  });
}

// 贝壳类型列表场景
function createShellTypeContainers() {
  shellScene.alpha = 1;

  var typeContainers = [];
  for (var i = 0; i < window.shellTypes.length; i++) {
    var c = new Container();
    // 添加到场景中
    shellScene.addChild(c);

    c.width = window.screenSize.width;
    c.height = window.screenSize.height / 3;
    c.position.set(0, window.screenSize.height / 3 * i);

    typeContainers.push(c);
    // 创建贝壳类型的标签
    createTypeNameLabel(c, window.shellTypes[i]);
    // 显示 贝壳图片
    createShells(c, window.shellTypes[i].shells);
  };
  stage.addChild(shellScene);
}

// 游戏的界面
function createSelectContainer(shell, randomShells) {
  if(selectScene) stage.removeChild(selectScene);
  selectScene = new Container();
  selectScene.position.set(-window.screenSize.width, 0);
  selectScene.alpha = 1;
  var m = new PIXI.Text(
    shell.name, {
      font: 'bold 80px TianZhen', 
      fill: '#cc00ff', 
      align: 'center', 
      stroke: '#FFFFFF', 
      strokeThickness: 1 
    });
  m.anchor.set(0.5, 0.5);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 6);
  selectScene.addChild(m);

  stage.addChild(selectScene);

  console.log(randomShells);
  return selectScene;
}


function createShells(c, shells) {
  for (var i = 0; i < shells.length; i++) {
    var x = window.screenSize.width / 7 * (i + 1);
    var y = window.screenSize.height / 5;
    // create our little bunny friend..
    var s = new PIXI.Sprite(resources[shells[i].img].texture);
    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    s.interactive = true;
    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    s.buttonMode = true;
    // center the bunny's anchor point
    s.anchor.set(0.5);
    // make it a bit bigger, so it's easier to grab
    s.scale.set(0.25);
    s.position.set(x, y);
    // s 添加鼠标事件
    // events for drag start
    s.on('mousedown', function(event) {
        this.alpha = 0.5;
      })
     .on('mouseup', function() {
        this.alpha = 1;
        console.log(this.m);
        // 点击之后，切换到游戏场景
        gotoSelectScene(this.m);
      });

    s.m = shells[i];
    // 一些动作
    var action = new PIXI.action.Repeat(
      new PIXI.action.Sequence([
        new PIXI.action.DelayTime(Math.random()),
        new PIXI.action.ScaleBy(0.01, 0.01, 0.5),
        new PIXI.action.ScaleBy(-0.01, -0.01, 0.5),
      ])
    );
    PIXI.actionManager.runAction(s, action);

    var m = new PIXI.Text(
    shells[i].name, {
      font: 'bold 30px TianZhen', 
      fill: '#fff', 
      align: 'center', 
      // stroke: '#fff', 
      // strokeThickness: 1 
    });
    m.anchor.set(0.5);
    m.position.set(x, y + 70);
    c.addChild(m);

    c.addChild(s);
  };
}


function createTypeNameLabel(c, type) {
  var m = new PIXI.Text(
    type.name, {
      font: 'bold 50px TianZhen', 
      fill: '#cc00ff', 
      align: 'center', 
      stroke: '#FFFFFF', 
      strokeThickness: 1 
    });
  m.anchor.set(0, 0.5);
  m.position.set(window.screenSize.width / 7, window.screenSize.height / 3 / 5);
  c.addChild(m);
}

// 背景图
function createBgImage() {
  var background = new Sprite(resources[backgroundImage].texture);
  bgContainer.addChild(background);
  background.width = window.innerWidth;
  background.height = window.innerHeight;
  
  bgOverlay = new PIXI.TilingSprite(PIXI.Texture.fromImage("res/img/zeldaWaves.png"), windowSize.width, windowSize.height);
  bgContainer.addChild(bgOverlay);
  bgOverlay.alpha = 0.1;

  displacementTexture = new Sprite(resources['res/img/displacement_map.jpg'].texture);

  displacementFilter = new PIXI.filters.DisplacementFilter(displacementTexture, 50);
  displacementFilter.scale.x = 50;
  displacementFilter.scale.y = 50;
  // var blurFilter = new PIXI.filters.BlurFilter();
  // var noiseFilter = new PIXI.filters.NoiseFilter();
  bgContainer.filters = [displacementFilter];
  return bgContainer;
}

function animate() {
  count += 0.1;
  var blurAmount = Math.cos(count);

  bgOverlay.tilePosition.x = count * -10 // blurAmount * 40;
  bgOverlay.tilePosition.y = count * -10

  // render the stage
  renderer.render(stage);
  requestAnimationFrame(animate);
  PIXI.actionManager.update();
}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  // this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  // this.dragging = false;
  // set the interaction data to null
  this.data = null;
  console.log(this.m);
  // 点击之后，切换到第一个场景
  PIXI.actionManager.runAction(shellScene, new PIXI.action.FadeOut(0.5));
  // console.log(textMessage.x, textMessage.y. textMessage.width, textMessage.height);
  // if (this.collision) {
  //   if (this.img[1] == textMessage.m[1]) {
  //     alert('success');
  //   }
  //   else {
  //     alert('fail');
  //   }
  // }
}

// function onDragMove() {
//   if (this.dragging) {
//     var newPosition = this.data.getLocalPosition(this.parent);
//     this.position.x = newPosition.x;
//     this.position.y = newPosition.y;

//     // 碰撞检测
//     this.collision = hitTestRectangle(this, textMessage);
//   }
// }
