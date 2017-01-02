function initScene(btnAlpha) {
  counterTimer = window.timeout;
  if(indexScene) stage.removeChild(indexScene);
  if(selectScene) stage.removeChild(selectScene);
  if(successScene) stage.removeChild(successScene);
  if(failScene) stage.removeChild(failScene);
  if (btnAlpha === undefined) {
    btnAlpha = 1;
  }
  backBtn.alpha = btnAlpha;
  backIndexBtn.alpha = btnAlpha;
}

// 到游戏场景
function gotoSelectScene(shell) {
  initScene();
  currentScene = 'select';
  selectScene = createSelectContainer(shell, randomShells(shell, 10));

  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  PIXI.actionManager.runAction(selectScene, new PIXI.action.MoveTo(0, 0, 0.5));
  // PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeIn(0.5));
}

// 到贝壳场景
function gotoShellScene() {
  initScene();
  currentScene = 'shell';
  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(0, 0, 0.5));
  // PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
}

function gotoIndexScene() {
  initScene(0);
  currentScene = 'index';
  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  // PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
  createIndexContainer();
}

function gotoSuccessScene(shell) {
  initScene();
  currentScene = 'success';
  // PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

  successScene = createSuccessContainer(shell);
  for(var i = 0; i < successScene.children.length; i ++) {
    PIXI.actionManager.runAction(successScene.children[i], new PIXI.action.ScaleBy(0.5, 0.5, 0.3));
  }
}

function gotoFailScene(shell) {
  initScene();
  currentScene = 'fail';
  PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

  failScene = createFailContainer(shell);
  PIXI.actionManager.runAction(failScene, new PIXI.action.FadeIn(1));
}