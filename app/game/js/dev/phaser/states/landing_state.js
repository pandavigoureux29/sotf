"use strict";

var LandingState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Landing", this, false);
};

LandingState.prototype = Object.create(Phaser.State.prototype);
LandingState.prototype.constructor = LandingState;

LandingState.prototype.preload = function() {
}

LandingState.prototype.create = function() {

	var teeth = this.game.add.sprite(this.game.width * 0.5,this.game.height*0.5 + 10,"start_bg");
	teeth.anchor.setTo(0.5,0.5);
	//teeth.scale.setTo(1.5,1.5);
	teeth.y += 20;

	var play = this.game.add.button(this.game.width * 0.5,this.game.height *0.5 + 10, 
    					'play',
    					this.onPlay, this, 1, 0, 0) ;
	play.anchor.setTo(0.5,0.5);

	var styleBig = { font: "55px Arial", fill: "#ffff", align: "center" };
	var text = this.game.add.text(this.game.width * 0.5, 0, 
    			"SNAKE ON THE FLY", styleBig);
    text.anchor.x = 0.5

    var sea = this.game.add.audio('sea');
    sea.play("",0,0.2,true,true);
}

LandingState.prototype.onPlay = function() {	
	this.game.state.start("Tuto");
}
