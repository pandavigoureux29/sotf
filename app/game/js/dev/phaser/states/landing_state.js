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

	var teeth = this.game.add.sprite(this.game.width * 0.5,this.game.height*0.5,"start_bg");
	teeth.anchor.setTo(0.5,0.5);
	teeth.scale.setTo(1.5,1.5);
	teeth.y += 20;

	var play = this.game.add.button(this.game.width * 0.5,this.game.height *0.5, 
    					'play',
    					this.onPlay, this, 1, 0, 0) ;
	play.anchor.setTo(0.5,0.5);

}

LandingState.prototype.onPlay = function() {	
	this.game.state.start("Play");
}
