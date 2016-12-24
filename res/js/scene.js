function initScene() {
	if(selectScene) stage.removeChild(selectScene);
	if(successScene) stage.removeChild(successScene);
	if(failScene) stage.removeChild(failScene);
}

// 到游戏场景
function gotoSelectScene(shell) {
	initScene();
	selectScene = createSelectContainer(shell, randomShells(shell, 10));

  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  PIXI.actionManager.runAction(selectScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeIn(0.5));
}

// 到贝壳场景
function gotoShellScene() {
	initScene();

  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
}

function gotoIndexScene() {
	initScene();
	console.log('gotoIndexScene');
}

function gotoSuccessScene(shell) {
	initScene();
	console.log('gotoSuccessScene');
	PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

	successScene = createSuccessContainer(shell);
	PIXI.actionManager.runAction(successScene, new PIXI.action.ScaleBy(1, 1, 0.3));
}

function gotoFailScene(shell) {
	initScene();
	console.log('gotoFailScene');
	PIXI.actionManager.runAction(selectScene, new PIXI.action.FadeOut(0.1));

	failScene = createFailContainer(shell);
	PIXI.actionManager.runAction(failScene, new PIXI.action.FadeIn(1));
}