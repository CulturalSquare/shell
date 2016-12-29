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
  successScene = new Container(), // 游戏成功场景
  failScene = new Container(), // 游戏失败场景
  
  renderer = autoDetectRenderer(screenSize.width, screenSize.height);


renderer.view.style.position = "absolute"
renderer.view.style.width = screenSize.width + "px";
renderer.view.style.height = screenSize.height + "px";
renderer.view.style.display = "block";

stage.addChild(bgContainer);

// 返回按钮
var backBtn = new PIXI.Text(
  '返回重新选择', {
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
}).on('mouseout', function() {
  this.alpha = 1;
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
  [backgroundImage, 'res/img/displacement_map.jpg', 'res/img/zeldaWaves.png', 'res/audio/bg.mp3']
);

// load image resourse
loader.add(distinct(images_resource)).load(setup);

// 每一个分类为一个 Container，便于统一动画处理。
var shellTypeContainers = [];

var textMessage, displacementFilter, displacementTexture,
  bgOverlay, count = 0;

function setup() {
  var bgMusic = PIXI.audioManager.getAudio('res/audio/bg.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;
  bgMusic.play();

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


function createSuccessContainer(shell) {
  if(successScene) stage.removeChild(successScene);
  successScene = new Container();
  stage.addChild(successScene);

  successScene.position.set(0, 0);
  successScene.scale.set(0);

  var m = new PIXI.Text(
    '恭喜你，答对了', {
      font: '100px TianZhen', 
      fill: '#ffff00', 
      align: 'center', 
      // stroke: '#31a131', 
      // strokeThickness: 1 
    });
  m.anchor.set(0.5, 0.5);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 6);
  successScene.addChild(m);

  var s = new PIXI.Sprite(resources[shell.img].texture);
  successScene.addChild(s);
  s.anchor.set(0.5);
  s.scale.set(0.5);
  s.position.set(window.screenSize.width / 2, window.screenSize.height / 2);

  return successScene
}


function createFailContainer(shell) {
  if(failScene) stage.removeChild(failScene);
  failScene = new Container();
  stage.addChild(failScene);

  failScene.position.set(0, 0);
  failScene.alpha = 0;

  var m = new PIXI.Text(
    '很遗憾，答错了', {
      font: '100px TianZhen', 
      fill: '#e543e5', 
      align: 'center', 
      // stroke: '#e543e5',
      // strokeThickness: 1 
    });
  m.anchor.set(0.5, 0.5);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 6);
  failScene.addChild(m);

  var s = new PIXI.Sprite(resources[shell.img].texture);
  failScene.addChild(s);
  s.anchor.set(0.5);
  s.scale.set(0.5);
  s.position.set(window.screenSize.width / 2, window.screenSize.height / 2);

  return failScene
}


// 游戏的界面
function createSelectContainer(shell, randomShells) {
  if(selectScene) stage.removeChild(selectScene);
  selectScene = new Container();
  stage.addChild(selectScene);

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
  // m.position.set(window.screenSize.width / 2, window.screenSize.height / 6);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 2);
  selectScene.addChild(m);

  // console.log(randomShells);

  // 随机摆放需要被猜的贝壳
  for (var i = 0; i < randomShells.length; i++) {
    // var x = window.screenSize.width / 6 * (i % 5 + 1);
    // var y = window.screenSize.height / 4 * (2 + Math.floor(i / 5));
    var x = initPositions[i][0];
    var y = initPositions[i][1];
    var s = new PIXI.Sprite(resources[randomShells[i].img].texture);
    selectScene.addChild(s);
    s.interactive = true;
    s.buttonMode = true;
    s.anchor.set(0.5);
    s.scale.set(0.25);
    s.position.set(x, y);
    // s 添加鼠标事件
    s.m = randomShells[i];
    s.t = shell;
    s.mm = m;
    s.on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      // events for drag end
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
      // events for drag move
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);
    // 一些动作
    var action = new PIXI.action.Repeat(
      new PIXI.action.Sequence([
        new PIXI.action.DelayTime(Math.random()),
        new PIXI.action.ScaleBy(0.01, 0.01, 0.5),
        new PIXI.action.ScaleBy(-0.01, -0.01, 0.5),
      ])
    );
    PIXI.actionManager.runAction(s, action);
  }
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
     .on('touchstart', function(event) {
        this.alpha = 0.5;
      })
     .on('mouseup', function() {
        this.alpha = 1;
        // 点击之后，切换到游戏场景
        gotoSelectScene(this.m);
      })
     .on('touchend', function() {
        this.alpha = 1;
        // 点击之后，切换到游戏场景
        gotoSelectScene(this.m);
      })
     .on('touchendoutside', function() {
        this.alpha = 1;
      })
     .on('mouseout', function() {
        this.alpha = 1;
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

// 18 贝壳页面，类型的标签
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
  
  bgOverlay = new PIXI.TilingSprite(PIXI.Texture.fromImage("res/img/zeldaWaves.png"), window.screenSize.width, window.screenSize.height);
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
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
  if (this.collision) {
    if (this.m.img === this.t.img) {
      // 成功
      gotoSuccessScene(this.t);
    }
    else {
      gotoFailScene(this.t);
    }
  }
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;

    // 碰撞检测
    this.collision = hitTestRectangle(this, this.mm);

    if (this.collision) {
      this.mm.alpha = 0.5;
    }
    else {
      this.mm.alpha = 1;
    }
  }
}