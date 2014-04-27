"use strict";

var PLAYER;
var BG;
var GRIP;
var SEA_Y = 175;

var HUNGER_RATE = 100;
var HUNGER_DROP = 2;

var textScore;

var PlayState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Play", this, false);

	this.healthCounter = 0;

	this.nextDiffInd = 0;
	this.diffCount = 0;

};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;

PlayState.prototype.preload = function(){

}
var bird;
PlayState.prototype.create = function(){

	this.createDifficulty();

	SCORE = 0;

	this.game.physics.startSystem(Phaser.Physics.P2JS);
	this.game.physics.p2.gravity.y = PhysicsSettings.GLOBAL_GRAVITY;
	this.collisionManager = new CollisionManager(this.game);

	BG = new GameObject(this.game,this.game.width*0.5,140,'bg',"BG");
	this.add.existing(BG);


	//ship generator
	var gen = new GameObject(this.game,0,0,"","ship_generator");
	this.shipGen = gen.addBehaviour(new Generator(gen));
	this.shipGen.create(	{autostart:true, 
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
	this.birdGen = generator.addBehaviour(new Generator(generator));
	this.birdGen.create(	{autostart:true, 
					classType:Bird , 
					textureKey : "touky",
					speedMin : 70,
					speedMax : 180 });
	this.birdGen.poolCount = 5;
	this.birdGen.maxSim = 2;
	this.timeMin = 2;
	this.timeRange = 2;
	this.game.add.existing(generator);

	this.createText();
	this.createLifeBar();
}

PlayState.prototype.update = function(){
	if( textScore != null )
		textScore.text = ""+SCORE;

	this.healthCounter ++;
	if( this.healthCounter >= HUNGER_RATE){
		this.takeLife(HUNGER_DROP);
	}

	this.diffCount ++ ;
	if(this.nextDiffInd < this.diffData.length && this.diffCount >= this.diffData[this.nextDiffInd].time){
		var data = this.diffData[this.nextDiffInd];
		this.processDiff(data);
		this.nextDiffInd ++;
	}
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

var LIFEBAR, LIFE ;
var MAX_LIFE = 100;

PlayState.prototype.createLifeBar = function(){

	this.lifeLength = 144;

	var grey = this.game.add.tileSprite(this.game.width, this.game.height, this.lifeLength, 48, 'tooth_grey');
	grey.anchor.setTo(1,1);

	LIFEBAR = this.game.add.tileSprite(this.game.width, this.game.height, this.lifeLength, 48, 'tooth');
	LIFEBAR.anchor.setTo(1,1);

	LIFE = MAX_LIFE;
	this.updateLifeBar();
}

PlayState.prototype.takeLife = function(_ammount){
	this.healthCounter = 0;
	LIFE -= _ammount;
	this.updateLifeBar();
	if( LIFE < 0){
		this.game.state.start("End");
	}
}

PlayState.prototype.giveLife = function(_ammount){
	this.healthCounter = 0;
	LIFE += _ammount;
	if( LIFE > MAX_LIFE )
		LIFE = MAX_LIFE;
	this.updateLifeBar();
}

PlayState.prototype.updateLifeBar = function(){
	var ratio = (LIFE / MAX_LIFE);
	LIFEBAR.x = this.game.width + ( this.lifeLength * ( 1 - (LIFE / MAX_LIFE) ) );
	LIFEBAR.tilePosition.x = this.lifeLength *  ratio;
}


PlayState.prototype.processDiff = function(_data){
	console.log(" Level " + this.nextDiffInd);
	if( _data.hungerRate ){
		HUNGER_RATE = _data.hungerRate;
	}

	if( _data.ships ){
		this.shipGen.maxSim = _data.ships;
	}

	if( _data.startShips ){
		console.log("startShips");
		this.shipGen.start();
	}
}

PlayState.prototype.createDifficulty = function(){
	this.diffData = [
		{ time : 100 , hungerRate : 100},
		{ time : 1000, hungerRate : 90, startShips:true},
		{ time : 2000, hungerRate : 50, ships:2},
		{ time : 3000 , hungerRate : 40},
		{ time : 5000 , hungerRate : 30}
	];	
}