"use strict";

var PLAYER;
var BG;
var GRIP;
var SEA_Y = 175;

var SCORE = 0;

var textScore;

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


	//ship generator
	var gen = new GameObject(this.game,0,0,"","ship_generator");
	var shipGen = gen.addBehaviour(new Generator(gen));
	shipGen.create(	{autostart:true, 
					classType:Ship , 
					textureKey : "ship",
					speedMin : 20,
					speedMax : 90,
					yMax : SEA_Y+1,
					yMin : SEA_Y});
	this.game.add.existing(gen);

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

	//birds generator
	var generator = new GameObject(this.game,0,0,"","bird_generator");
	var birdGen = generator.addBehaviour(new Generator(generator));
	birdGen.create(	{autostart:true, 
					classType:Bird , 
					textureKey : "touky",
					speedMin : 70,
					speedMax : 180 });
	this.game.add.existing(generator);

	this.createText();
}

PlayState.prototype.update = function(){
	if( textScore != null )
		textScore.text = ""+SCORE;
}

PlayState.prototype.shutdown = function(){

}

PlayState.prototype.sharkOffscreen = function(){
	GRIP.replace(100,300);
}

//================================================================
//
//
PlayState.prototype.createText = function(){
	var style = { font: "30px Arial", fill: "#ffff", align: "center" };
    textScore = this.game.add.text(this.game.width-6, 6,
    			""+SCORE, style);

    textScore.anchor.setTo(1,0);
}

//===============================================================
//						MENU IN GAME
//==============================================================

PlayState.prototype.createMenu = function(){
}

PlayState.prototype.createWaves = function(){
	var waves = this.game.add.tileSprite(-10, SEA_Y - 20, 800, 300, 'wave');
	waves.alpha = 0.9;
	waves.fixedToCamera = true;
	waves.autoScroll(10,0);
}