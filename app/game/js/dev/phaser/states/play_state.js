"use strict";

var PLAYER;
var BG;
var GRIP;
var SEA_Y = 250;

var PlayState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Play", this, false);
};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;

PlayState.prototype.preload = function(){

}

PlayState.prototype.create = function(){

	BG = new GameObject(this.game,this.game.width*0.5,140,'bg',"BG");
	this.add.existing(BG);

	this.createWaves();

	var shark = new GameObject(this.game,100,110,'shark',"Shark");
	var BHshark = shark.addBehaviour( new Shark(shark));
	this.add.existing(shark);

	//Grip
	var grip = new GameObject(this.game,300,100,"grip","Grip");
	GRIP = grip.addBehaviour(new LauncherGrip(grip));
	GRIP.create({shark : BHshark });
	this.add.existing(grip);
	GRIP.replace(100,300);

	//Bird
	var bird = new GameObject(this.game,400,0,"touky","touky");
	var BHbird = bird.addBehaviour(new Bird(bird));
	BHbird.spawn(100,100);
	this.add.existing(bird);
}

PlayState.prototype.update = function(){

}

PlayState.prototype.shutdown = function(){

}

PlayState.prototype.sharkOffscreen = function(){
	GRIP.replace(100,300);
}

//===============================================================
//						MENU IN GAME
//==============================================================

PlayState.prototype.createMenu = function(){
}

PlayState.prototype.createWaves = function(){
	var waves = this.game.add.tileSprite(-10, SEA_Y - 100, 800, 300, 'wave');
	waves.fixedToCamera = true;
	waves.autoScroll(10,0);
}