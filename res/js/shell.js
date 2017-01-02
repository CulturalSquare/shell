var Container = PIXI.Container,
  DisplayObjectContainer = PIXI.DisplayObjectContainer,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

var currentScene = 'index'; // index, shell, select, success, fail
var counterTimer = window.timeout;; // 30秒没有操作，跳回index 

var stage = new Container(),
  bgContainer = new DisplayObjectContainer(), // 背景效果
  indexScene = new DisplayObjectContainer(), // 首页屏保场景
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

var typeContainers = [];
var shellTypesLable = [];

// 重新选择
var backBtn = new PIXI.Text(
  '返回上层', {
    font: '30px ' + window.font, 
    fill: '#fff', 
    align: 'center',
  });
backBtn.anchor.set(1, 0);
backBtn.alpha = 0;
backBtn.rotation = Math.PI / 2;
backBtn.position.set(window.screenSize.width - 30, window.screenSize.height - 30);
backBtn.interactive = true;
backBtn.buttonMode = true;
backBtn.on('mousedown', function(event) {
  this.alpha = 0.5;
}).on('mouseup', function() {
  if (currentScene === 'shell') {
    this.alpha = 1;
    showShellTypes();
  } else {
    gotoShellScene();
    showShellTypes();
  }
}).on('mouseout', function() {
  // this.alpha = 1;
});
stage.addChild(backBtn);

// 重新首页
var backIndexBtn = new PIXI.Text(
  '页首回返', {
    font: '30px ' + window.font, 
    fill: '#fff', 
    align: 'center',
  });
backIndexBtn.anchor.set(0, 0);
backIndexBtn.alpha = 0;
backIndexBtn.rotation = -Math.PI / 2;
backIndexBtn.position.set(30, window.screenSize.height - 30);
backIndexBtn.interactive = true;
backIndexBtn.buttonMode = true;
backIndexBtn.on('mousedown', function(event) {
  this.alpha = 0.5;
}).on('mouseup', function() {
  this.alpha = 1;
  gotoIndexScene();
}).on('mouseout', function() {
  // this.alpha = 1;
});

stage.addChild(backIndexBtn);

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
// var shellTypeContainers = [];

var textMessage, displacementFilter, displacementTexture,
  bgOverlay, count = 0;

function setup() {
  var bgMusic = PIXI.audioManager.getAudio('res/audio/bg.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;
  bgMusic.play();

  // 创建背景
  bgContainer = createBgImage();
  bgContainer.interactive = true;
  bgContainer.buttonMode = true;
  bgContainer.click = function(event) {
    if (currentScene === 'index') gotoShellScene();
  };

  // 循环检查是否跳回首页
  var backIndexAction = new PIXI.action.Repeat(
    new PIXI.action.Sequence([
      new PIXI.action.DelayTime(1),
      new PIXI.action.CallFunc(function() {
        if (counterTimer > 0) counterTimer --;
        if (counterTimer <= 0) gotoIndexScene();
      })
    ])
  );
  PIXI.actionManager.runAction(bgContainer, backIndexAction);

  // 游戏首页
  createIndexContainer();
  // gotoIndexScene();
  // 18 个贝壳场景
  createShellTypeContainers();
  // 游戏选择场景
  // createSelectContainer();
  animate();
}

function createIndexContainer() {
  if(indexScene) stage.removeChild(indexScene);
  indexScene = new DisplayObjectContainer();
  indexScene.interactive = true;
  indexScene.buttonMode = true;
  indexScene.width = window.screenSize.width;
  indexScene.height = window.screenSize.height;

  var m = new PIXI.Text(
    '贝类游戏', {
      font: 'bold 200px ' + window.font, 
      fill: '#d02323', 
      align: 'center', 
    });
    m.anchor.set(0.5);
    m.position.set(window.screenSize.width / 2, window.screenSize.height / 2);
    indexScene.addChild(m);

  stage.addChild(indexScene);
  indexScene.click = function(event) {
    gotoShellScene();
  }
}

// 贝壳类型列表场景
function createShellTypeContainers() {
  shellScene.alpha = 1;
  shellScene.x = screenSize.width;// 隐藏
  for (var i = 0; i < window.shellTypes.length; i++) {
    var type = window.shellTypes[i];

    var m = new PIXI.Text(
    type.name, {
      font: 'bold 60px ' + window.font, 
      fill: '#d02323',
      align: 'center', 
      fontWeight: 'bold',
    });
    m.interactive = true;
    m.buttonMode = true;
    m.anchor.set(0.5, 0.5);
    m._index = i;
    m._x = window.screenSize.width / 6 * (i * 2 + 1);
    m._y = window.screenSize.height / 3;
    m.position.set(window.screenSize.width / 6 * (i * 2 + 1), window.screenSize.height / 3);
    m.on('mousedown', function(event) {
      this.alpha = 0.5;
    }).on('mouseup', function() {
      // do something
      this.alpha = 1;
      showTypeShells(type, this._index);
    }).on('mouseout', function() {
      this.alpha = 1;
    });

    shellScene.addChild(m);
    shellTypesLable.push(m)

    var c = createShells(type.shells);
    shellScene.addChild(c);
    // PIXI.actionManager.runAction(c, new PIXI.action.MoveTo(0, 0, 0.8));
    typeContainers.push(c);
  };
  stage.addChild(shellScene);
}

function createShells(shells) {
  var c = new Container();
  c.position.set(0, window.screenSize.height);
  for (var i = 0; i < shells.length; i++) {
    // var ox = window.screenSize.width / 7 * (i + 1);
    // var oy = window.screenSize.height / 3 * 2;
    // create our little bunny friend..
    var s = new PIXI.Sprite(resources[shells[i].img].texture);
    // s.ox = ox;
    // s.oy = oy;
    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    s.interactive = true;
    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    s.buttonMode = true;
    // center the bunny's anchor point
    s.anchor.set(0.5, 0);
    // make it a bit bigger, so it's easier to grab
    s.scale.set(0.25);
    s.position.set(window.screenSize.width / 7 * (i + 1), 0);
    // s 添加鼠标事件
    // events for drag start
    s.on('mousedown', function(event) {
        this.alpha = 0.5;
        counterTimer = window.timeout;
      })
     .on('touchstart', function(event) {
        this.alpha = 0.5;
        counterTimer = window.timeout;
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
        counterTimer = window.timeout;
      })
     .on('mouseout', function() {
        this.alpha = 1;
        counterTimer = window.timeout;
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
      font: 'bold 40px ' + window.font, 
      fill: '#fff', 
      align: 'center', 
    });
    m.anchor.set(0.5);
    m.position.set(s.x, s.y + 140);
    c.addChild(m);

    c.addChild(s);
  };
  return c;
}


function showTypeShells(shellType, index) {
  var hide_shell_action = new PIXI.action.MoveTo(0, window.screenSize.height, 0.2);
  var show_shell_action = new PIXI.action.MoveTo(0, window.screenSize.height / 2, 0.3);

  var show_type_action = new PIXI.action.MoveTo(window.screenSize.width / 2, window.screenSize.height / 4, 0.3);
  for (var i = 0; i < typeContainers.length; i++) {
    var shell_action = hide_shell_action;
    var type_action = new PIXI.action.MoveTo(shellTypesLable[i].x, -100, 0.1);;
    if (i === index) { 
      shell_action = show_shell_action;
      type_action = show_type_action;
    }
    PIXI.actionManager.runAction(typeContainers[i], shell_action);
    PIXI.actionManager.runAction(shellTypesLable[i], type_action);
  }
}

function showShellTypes() {
  var hide_shell_action = new PIXI.action.MoveTo(0, window.screenSize.height, 0.2);

  for (var i = 0; i < typeContainers.length; i++) {
    PIXI.actionManager.runAction(typeContainers[i], hide_shell_action);
    PIXI.actionManager.runAction(shellTypesLable[i], new PIXI.action.MoveTo(shellTypesLable[i]._x, shellTypesLable[i]._y, 0.2));
  }
}

function createSuccessContainer(shell) {
  if(successScene) stage.removeChild(successScene);
  successScene = new Container();
  stage.addChild(successScene);
  successScene.position.set(0, 0);

  var m = new PIXI.Text(
    '恭喜你 答对了', {
      font: '200px ' + window.font, 
      fill: '#d02323', 
      align: 'center', 
    });
  m.anchor.set(0.5, 0.5);
  m.scale.set(0.1);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 3 * 2);
  successScene.addChild(m);

  var s = new PIXI.Sprite(resources[shell.img].texture);
  successScene.addChild(s);
  s.anchor.set(0.5);
  s.scale.set(0.09);
  s.position.set(window.screenSize.width / 2, window.screenSize.height / 4);

  return successScene
}


function createFailContainer(shell) {
}


// 游戏的界面
function createSelectContainer(shell, randomShells) {
  if(selectScene) {
    stage.removeChild(selectScene);
    // g.removeChildren();
  }
  selectScene = new Container();
  stage.addChild(selectScene);

  selectScene.position.set(-window.screenSize.width, 0);
  selectScene.alpha = 1;
  var m = new PIXI.Text(
    shell.name, {
      font: 'bold 100px ' + window.font, 
      fill: '#d02323', 
      align: 'center',
    });
  m.anchor.set(0.5, 0.5);
  m.position.set(window.screenSize.width / 2, window.screenSize.height / 2);
  

  // 背景框
  var g = new PIXI.Graphics();
  g.beginFill(14867045, 0.3);
  var w = 520, h = 200;
  var rect = g.drawRoundedRect(window.screenSize.width / 2 - w / 2, window.screenSize.height / 2 - h / 2 + 25, w, h, 50);
  g.endFill();
  selectScene.addChild(rect);
  selectScene.addChild(m);

  var ttm = new PIXI.Text(
    '请将贝壳移到此处', {
      font: 'bold 40px ' + window.font, 
      fill: '#fff', 
      align: 'center', 
    });
  ttm.anchor.set(0.5, 0.5);
  ttm.position.set(window.screenSize.width / 2, window.screenSize.height / 2 + 70);
  selectScene.addChild(ttm);

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

// 18 贝壳页面，类型的标签
function createTypeNameLabel(c, type) {
  var m = new PIXI.Text(
    type.name, {
      font: 'bold 50px ' + window.font, 
      fill: '#cc00ff', 
      align: 'center', 
      // stroke: '#FFFFFF', 
      // strokeThickness: 1 
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
  counterTimer = window.timeout;

  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
  this.start_x = this.x;
  this.start_y = this.y;
}

function onDragEnd() {
  counterTimer = window.timeout;

  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
  if (this.collision) {
    if (this.m.img === this.t.img) {
      // 成功
      gotoSuccessScene(this.t);
      return;
    }
  }
  // 动画返回位置
  this.mm.alpha = 1;
  // gotoFailScene(this.t);
  var actionBack = new PIXI.action.MoveTo(this.start_x, this.start_y, 0.1);
  PIXI.actionManager.runAction(this, actionBack);
}

function onDragMove() {
  counterTimer = window.timeout;

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