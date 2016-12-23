// 到游戏场景
function gotoSelectScene(shell) {
	selectScene = createSelectContainer(shell, randomShells(shell, 10));
  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(window.screenSize.width, 0, 0.5));
  PIXI.actionManager.runAction(selectScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeIn(0.5));
}

// 到贝壳场景
function gotoShellScene() {
	if(selectScene) stage.removeChild(selectScene);

  PIXI.actionManager.runAction(shellScene, new PIXI.action.MoveTo(0, 0, 0.5));
  PIXI.actionManager.runAction(backBtn, new PIXI.action.FadeOut(0.5));
}

function gotoIndexScene() {
	console.log('gotoIndexScene');
}

function gotoSuccessScene() {
	console.log('gotoSuccessScene');
}