function initScene() {
  counterTimer = window.timeout;
	if(selectScene) stage.removeChild(selectScene);
	if(successScene) stage.removeChild(successScene);
	if(failScene) stage.removeChild(failScene);
}

// 到游戏场景
function gotoSelectScene(shell) {
	initScene();
  currentScene = 'select';
	selectScene = createSelectContainer(shell, randomShells(shell, 10));

  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  PIXI.actionManager.runAction(selectScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeIn(0.5));
}

// 到贝壳场景
function gotoShellScene() {
	initScene();
  currentScene = 'shell';
  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
}

function gotoIndexScene() {
	initScene();
  currentScene = 'index';
  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
}

function gotoSuccessScene(shell) {
	initScene();
	currentScene = 'success';
	PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

	successScene = createSuccessContainer(shell);
	PIXI.actionManager.runAction(successScene, new PIXI.action.ScaleBy(1, 1, 0.3));
}

function gotoFailScene(shell) {
	initScene();
	currentScene = 'fail';
	PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

	failScene = createFailContainer(shell);
	PIXI.actionManager.runAction(failScene, new PIXI.action.FadeIn(1));
}