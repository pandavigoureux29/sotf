"use strict";

var EndState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("End", this, false);
};

EndState.prototype = Object.create(Phaser.State.prototype);
EndState.prototype.constructor = EndState;

EndState.prototype.preload = function(){
	this.game.load.spritesheet("back_button","assets/images/back_button.png",48,48,3);
}

EndState.prototype.create = function(){
	if( SCORE > BEST_SCORE )
		BEST_SCORE = SCORE;
	this.createWaves();

	var style = { font: "30px Arial", fill: "#ffff", align: "center" };
	var styleBig = { font: "65px Arial", fill: "#ffff", align: "center" };

	var currentY = 40;
	//YOU DID
    var text = this.game.add.text(this.game.width * 0.5, currentY,
    			"You did", style);
    text.anchor.x = 0.5
    //score
    currentY += 30;
    text = this.game.add.text(this.game.width * 0.5, currentY, 
    			""+SCORE, styleBig);
    text.anchor.x = 0.5

	//YOU DID
	currentY += 168;
    var text = this.game.add.text(this.game.width * 0.5, currentY,
    			"You Best Score Was", style);
    text.anchor.x = 0.5
    //score
    currentY += 30;
    text = this.game.add.text(this.game.width * 0.5, currentY, 
    			""+BEST_SCORE, styleBig);
    text.anchor.x = 0.5

    this.game.add.button(this.game.width - 48,this.game.height - 48, 
    					'back_button',
    					this.onBack, this, 1, 0, 2) ;
}

EndState.prototype.createWaves = function(){
	var waves = this.game.add.tileSprite(-10, SEA_Y - 20, 800, 300, 'wave');
	waves.alpha = 0.9;
	waves.fixedToCamera = true;
	waves.autoScroll(10,0);
}

EndState.prototype.onBack = function(){
	this.game.state.start("Play");
}