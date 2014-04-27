"use strict";

var PLAYER;
var BG;
var GRIP;
var SEA_Y = 185;

var PlayState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Play", this, false);
};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;

PlayState.prototype.preload = function(){

}
var bird;
PlayState.prototype.create = function(){

	this.game.physics.startSystem(Phaser.Physics.P2JS);
	this.game.physics.p2.gravity.y = PhysicsSettings.GLOBAL_GRAVITY;
	this.collisionManager = new CollisionManager(this.game);

	BG = new GameObject(this.game,this.game.width*0.5,140,'bg',"BG");
	this.add.existing(BG);

	this.createWaves();

	var shark = new GameObject(this.game,100,110,'shark',"Shark");
	var BHshark = shark.addBehaviour( new Shark(shark));
	this.collisionManager.addGameObject(shark);
	this.game.add.existing(shark);

	//Grip
	var grip = new GameObject(this.game,300,100,"grip","Grip");
	GRIP = grip.addBehaviour(new LauncherGrip(grip));
	GRIP.create({shark : BHshark });
	this.game.add.existing(grip);
	GRIP.replace(100,300);

	//generator
	var generator = new GameObject(this.game,0,0,"","bird_generator");
	var birdGen = generator.addBehaviour(new Generator(generator));
	birdGen.create(	{autostart:true, 
					classType:Bird , 
					textureKey : "touky",
					speedMin : 100,
					speedMax : 200 });
	this.game.add.existing(generator);

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
	var waves = this.game.add.tileSprite(-10, SEA_Y -30, 800, 300, 'wave');
	waves.fixedToCamera = true;
	waves.autoScroll(10,0);
}